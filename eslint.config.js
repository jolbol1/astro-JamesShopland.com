import eslint from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";
import tailwind from "eslint-plugin-tailwindcss";


export default tseslint.config(
  {
    ignores: [
      "**/dist",
      "**/node_modules",
      "**/.astro",
      "**/.github",
      "**/.changeset",
      "**/.vercel",
    ],
  },

  // Global config
  // JavaScript
  eslint.configs.recommended,
  // TypeScript
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // Astro
  ...eslintPluginAstro.configs.recommended,

  //Tailwind
  ...tailwind.configs["flat/recommended"],
  {
    rules: {
      "tailwindcss/no-custom-classname": "off",
    },
    settings: {
      tailwindcss: {
        callees: ["cn"],
      },
    },
  }
);
