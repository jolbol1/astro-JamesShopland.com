/** @type {import('prettier').Config} */
export default {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  bracketSpacing: true,
  importOrder: [
    "^(astro/(.*)$)|^(astro$)",
    // The site has no React, but blog posts' code samples group React
    // imports, and Prettier formats those samples too.
    "^(react/(.*)$)|^(react$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/env(.*)$",
    "^@/types/(.*)$",
    "^@/config/(.*)$",
    "",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "",
    "^@/styles/(.*)$",
    "^@/app/(.*)$",
    "",
    "^[./]",
  ],
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-astro"],
  overrides: [
    {
      files: ["*.astro"],
      options: {
        parser: "astro",
      },
    },
    {
      // Whitespace inside these elements ends up in blog posts, so keep the
      // slot tight to the tags.
      files: ["src/components/mdx/*.astro"],
      options: {
        htmlWhitespaceSensitivity: "strict",
      },
    },
  ],
}
