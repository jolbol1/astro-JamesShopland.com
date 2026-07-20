// @ts-check
import { defineConfig } from "astro/config"

import cloudflare from "@astrojs/cloudflare"
import { unified } from "@astrojs/markdown-remark"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import remarkEmbedder from "@remark-embedder/core"
import tailwindcss from "@tailwindcss/vite"
import expressiveCode from "astro-expressive-code"
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"

import { autolinkConfig } from "./src/lib/headings"
import { remarkOembedOptions } from "./src/lib/oembed"

// https://astro.build/config
export default defineConfig({
  site: "https://jamesshopland.com",
  // Preserve Astro 6's HTML-aware whitespace behavior.
  compressHTML: true,
  image: {
    responsiveStyles: true,
  },
  markdown: {
    processor: unified({
      // @ts-expect-error oembed error
      remarkPlugins: [[remarkEmbedder.default, remarkOembedOptions]],
      rehypePlugins: [
        rehypeSlug,
        // @ts-expect-error rehypeAccessibleEmojis error
        rehypeAccessibleEmojis,
        [rehypeAutolinkHeadings, autolinkConfig],
      ],
    }),
  },
  integrations: [
    expressiveCode({
      styleOverrides: {
        codeFontFamily: "JetBrainsMono",
      },
    }),
    mdx(),
    react(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: cloudflare({
    // The OG image routes read local fonts and images while prerendering.
    prerenderEnvironment: "node",
    // All current Astro images are prerendered, so optimize them at build time.
    imageService: "compile",
  }),
})
