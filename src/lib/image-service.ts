/**
 * Astro's sharp service under a local entrypoint. The Cloudflare adapter's
 * "compile" mode only uses an image service it doesn't recognise as its own;
 * otherwise it falls back to a Workers-safe one that returns images
 * untouched when prerendering in Node. sharp is loaded lazily, inside
 * transforms, which only run at build time.
 */
export { default } from "astro/assets/services/sharp"
