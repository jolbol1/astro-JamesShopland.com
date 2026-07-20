// Thanks to https://kremalicious.com/favicon-generation-with-astro/
import type { APIRoute } from "astro"

import { getImage } from "astro:assets"
import { siteConfig } from "site-config"

import favicon from "../assets/favicons/favicon.png"

const faviconPngSizes = [192, 512]

export const GET: APIRoute = async () => {
  const icons = await Promise.all(
    faviconPngSizes.map(async (size) => {
      const image = await getImage({
        src: favicon,
        width: size,
        height: size,
        format: "png",
      })
      return {
        src: image.src,
        type: `image/${image.options.format}`,
        sizes: `${image.options.width}x${image.options.height}`,
      }
    })
  )

  const manifest = {
    name: siteConfig.title,
    short_name: siteConfig.author,
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    id: "/",
    background_color: "#ffffff",
    theme_color: "#0084ff",
    icons,
  }

  return new Response(JSON.stringify(manifest), {
    headers: { "Content-Type": "application/manifest+json" },
  })
}
