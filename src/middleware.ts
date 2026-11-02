import { defineMiddleware } from "astro:middleware"

const ISLAND_TTL_SECONDS = 60 * 60

// The DOM lib's CacheStorage type has no `default`; the Workers runtime does.
const edgeCache = () => (caches as unknown as { default: Cache }).default

/**
 * Serves server island responses from Cloudflare's edge cache for an hour,
 * so repeat visits skip rendering them and reading KV. Island URLs carry
 * props encrypted with the build's key, so each deploy gets fresh entries.
 */
export const onRequest = defineMiddleware(async ({ request }, next) => {
  const isIsland = new URL(request.url).pathname.startsWith("/_server-islands/")
  // Prerendering runs in Node, which has no Cache API.
  if (request.method !== "GET" || !isIsland || typeof caches === "undefined") {
    return next()
  }

  const cached = await edgeCache().match(request)
  if (cached) return cached

  const response = await next()
  if (!response.ok) return response

  const cacheable = new Response(response.body, response)
  cacheable.headers.set(
    "Cache-Control",
    `public, max-age=${ISLAND_TTL_SECONDS}`
  )

  const { waitUntil } = await import("cloudflare:workers")
  waitUntil(edgeCache().put(request, cacheable.clone()))

  return cacheable
})
