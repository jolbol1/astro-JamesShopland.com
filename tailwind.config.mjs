/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        mono: ["JetBrainsMono", ...fontFamily.mono],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--color-background)",
        red: {
          8: "var(--red-8)",
          9: "var(--red-9)",
          10: "var(--red-10)",
        },
        blue: {
          1: "var(--blue-1)",
          2: "var(--blue-2)",
          3: "var(--blue-3)",
          4: "var(--blue-4)",
          5: "var(--blue-5)",
          6: "var(--blue-6)",
          7: "var(--blue-7)",
          8: "var(--blue-8)",
          9: "var(--blue-9)",
          10: "var(--blue-10)",
          11: "var(--blue-11)",
          12: "var(--blue-12)",
          contrast: "var(--blue-contrast)",
          surface: "var(--blue-surface)",
        },
        "blue-a": {
          1: "var(--blue-a1)",
          2: "var(--blue-a2)",
          3: "var(--blue-a3)",
          4: "var(--blue-a4)",
          5: "var(--blue-a5)",
          6: "var(--blue-a6)",
          7: "var(--blue-a7)",
          8: "var(--blue-a8)",
          9: "var(--blue-a9)",
          10: "var(--blue-a10)",
          11: "var(--blue-a11)",
          12: "var(--blue-a12)",
        },
        gray: {
          1: "var(--gray-1)",
          2: "var(--gray-2)",
          3: "var(--gray-3)",
          4: "var(--gray-4)",
          5: "var(--gray-5)",
          6: "var(--gray-6)",
          7: "var(--gray-7)",
          8: "var(--gray-8)",
          9: "var(--gray-9)",
          10: "var(--gray-10)",
          11: "var(--gray-11)",
          12: "var(--gray-12)",
          contrast: "var(--gray-contrast)",
        },
        "gray-a": {
          1: "var(--gray-a1)",
          2: "var(--gray-a2)",
          3: "var(--gray-a3)",
          4: "var(--gray-a4)",
          5: "var(--gray-a5)",
          6: "var(--gray-a6)",
          7: "var(--gray-a7)",
          8: "var(--gray-a8)",
          9: "var(--gray-a9)",
          10: "var(--gray-a10)",
          11: "var(--gray-a11)",
          12: "var(--gray-a12)",
        },
      },
      boxShadow: {
        1: "var(--shadow-1)",
        2: "var(--shadow-2)",
        3: "var(--shadow-3)",
        4: "var(--shadow-4)",
        5: "var(--shadow-5)",
        6: "var(--shadow-6)",
        "card-surface": "var(--base-card-surface-box-shadow)",
        "card-surface-hover": "var(--base-card-surface-hover-box-shadow)",
        "card-surface-active": "var(--base-card-surface-active-box-shadow)",
        "card-classic": "var(--card-shadow)",
      },
    },
  },
  plugins: [typography, animate],
};
