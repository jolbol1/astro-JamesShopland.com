// Imported lazily: prerendering runs in Node, which can't load
// `cloudflare:workers`, and still bundles the server islands' modules.
const workers = () => import("cloudflare:workers")

const DAY_MS = 24 * 60 * 60 * 1000
const RETRY_AFTER_MS = 60 * 60 * 1000

interface CacheEntry<T> {
  value: T | null
  refreshAt: number
}

interface CachedOptions<T> {
  key: string
  load: () => Promise<T>
  /** How long a loaded value is served before it is refreshed. */
  maxAgeMs?: number
}

// One refresh per key at a time within this isolate.
const refreshing = new Map<string, Promise<unknown>>()

async function refresh<T>(
  key: string,
  previous: T | null,
  load: () => Promise<T>,
  maxAgeMs: number
): Promise<T | null> {
  const running = refreshing.get(key) as Promise<T | null> | undefined
  if (running) return running

  const task = (async () => {
    let entry: CacheEntry<T>
    try {
      entry = { value: await load(), refreshAt: Date.now() + maxAgeMs }
    } catch (error) {
      console.error(`Failed to refresh cached ${key}`, error)
      // Keep the last good value and wait before asking the source again.
      entry = { value: previous, refreshAt: Date.now() + RETRY_AFTER_MS }
    }

    try {
      const { env } = await workers()
      await env.CACHE.put(key, JSON.stringify(entry))
    } catch (error) {
      console.error(`Failed to write cached ${key}`, error)
    }

    return entry.value
  })().finally(() => refreshing.delete(key))

  refreshing.set(key, task)
  return task
}

/**
 * Serves `key` from Workers KV. A stale value is returned straight away and
 * refreshed in the background, so a failing source keeps showing the last good
 * value. Only the first request, with nothing stored yet, waits for `load`.
 */
export async function cached<T>({
  key,
  load,
  maxAgeMs = DAY_MS,
}: CachedOptions<T>): Promise<T | null> {
  const { env, waitUntil } = await workers()

  let entry: CacheEntry<T> | null
  try {
    entry = await env.CACHE.get<CacheEntry<T>>(key, "json")
  } catch (error) {
    // Don't fall through to the source on every request while KV is failing.
    console.error(`Failed to read cached ${key}`, error)
    return null
  }

  if (!entry) return refresh(key, null, load, maxAgeMs)

  if (Date.now() >= entry.refreshAt) {
    waitUntil(refresh(key, entry.value, load, maxAgeMs))
  }

  return entry.value
}
