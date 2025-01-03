// Thanks to https://kremalicious.com/favicon-generation-with-astro/
import path from "node:path"
import type { APIRoute } from "astro"

import sharp from "sharp"
import ico from "sharp-ico"

// relative to project root
const faviconSrc = path.resolve("src/assets/favicons/favicon.png")

export const GET: APIRoute = async () => {
  // resize to 32px PNG
  const buffer = await sharp(faviconSrc).resize(32).toFormat("png").toBuffer()
  // generate ico
  const icoBuffer = ico.encode([buffer])

  return new Response(icoBuffer, {
    headers: { "Content-Type": "image/x-icon" },
  })
}