// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://jamesshopland.com",
  integrations: [expressiveCode(), mdx(), react(), tailwind(), sitemap()],
  adapter: vercel({
    imageService: true,
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
});
