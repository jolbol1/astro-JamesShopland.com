/**
 * Kebab-cases a post id or tag the way lodash.kebabcase did, so existing
 * URLs stay the same: accents dropped, apostrophes removed, and letters
 * split from digits ("css3" becomes "css-3").
 */
export function slugify(value: string) {
  const words = value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .toLowerCase()
    .match(/[a-z]+|[0-9]+/g)

  return words?.join("-") ?? ""
}
