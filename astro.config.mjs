// @ts-check
import { defineConfig } from "astro/config"

import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import vercel from "@astrojs/vercel"
import expressiveCode from "astro-expressive-code"

// https://astro.build/config
export default defineConfig({
  site: "https://jamesshopland.com",
  experimental: {
    svg: true,
  },
  integrations: [
    expressiveCode(),
    mdx(),
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  adapter: vercel({
    imageService: true,
    devImageService: "sharp",
    imagesConfig: {
      domains: [""],
      sizes: [
        16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920,
        2048, 3840,
      ],
    },
    webAnalytics: {
      enabled: true,
    },
  }),
})
