// @ts-check
import { defineConfig } from "astro/config"

import db from "@astrojs/db"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import vercel from "@astrojs/vercel"
import remarkEmbedder from "@remark-embedder/core"
import expressiveCode from "astro-expressive-code"
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"

import { autolinkConfig } from "./src/lib/headings"
import { remarkOembedOptions } from "./src/lib/oembed"

// https://astro.build/config
export default defineConfig({
  site: "https://jamesshopland.com",
  experimental: {
    svg: true,
  },
  markdown: {
    // @ts-expect-error oembed error
    remarkPlugins: [[remarkEmbedder.default, remarkOembedOptions]],
    rehypePlugins: [
      rehypeSlug,
      // @ts-expect-error rehypeAccessibleEmojis error
      rehypeAccessibleEmojis,
      [rehypeAutolinkHeadings, autolinkConfig],
    ],
  },
  integrations: [
    expressiveCode({
      styleOverrides: {
        codeFontFamily: "JetBrainsMono",
      },
    }),
    mdx(),
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    db(),
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
