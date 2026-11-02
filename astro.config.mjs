// @ts-check
import { defineConfig, fontProviders } from "astro/config"

import cloudflare from "@astrojs/cloudflare"
import { unified } from "@astrojs/markdown-remark"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import remarkEmbedder from "@remark-embedder/core"
import tailwindcss from "@tailwindcss/vite"
import expressiveCode from "astro-expressive-code"
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"

import { autolinkConfig } from "./src/lib/headings"
import { remarkOembedOptions } from "./src/lib/oembed"

const serverDeps = ["class-variance-authority", "clsx", "tailwind-merge"]

// https://astro.build/config
export default defineConfig({
  site: "https://jamesshopland.com",
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Inter",
      cssVariable: "--font-inter",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Inter-Variable.woff2"],
            weight: "100 900",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      fallbacks: ["monospace"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/JetBrainsMono-Regular.woff2"],
            weight: "400",
            style: "normal",
          },
        ],
      },
    },
  ],
  // Preserve Astro 6's HTML-aware whitespace behavior.
  compressHTML: true,
  image: {
    responsiveStyles: true,
    // Resize and re-encode images at build time; see the file for why.
    service: { entrypoint: "./src/lib/image-service.ts" },
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
        codeFontFamily: "var(--font-jetbrains-mono)",
      },
    }),
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Pre-bundle the packages server-rendered components import. Found
    // mid-session, they make Vite re-optimise its dependencies while the dev
    // Worker still requests the old chunks ("file does not exist").
    environments: {
      ssr: { optimizeDeps: { include: serverDeps } },
      prerender: { optimizeDeps: { include: serverDeps } },
    },
  },
  adapter: cloudflare({
    // The OG image routes read local fonts and images while prerendering.
    prerenderEnvironment: "node",
    // All current Astro images are prerendered, so optimize them at build time.
    imageService: "compile",
  }),
})
