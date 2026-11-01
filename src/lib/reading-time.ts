const WORDS_PER_MINUTE = 200

/**
 * Counts the words a reader sees: MDX imports, JSX tags and link URLs are
 * dropped outside code blocks, and code inside them is counted as text.
 */
function countWords(markdown: string) {
  return markdown
    .split(/(^```[\s\S]*?^```)/m)
    .map((part, index) =>
      index % 2
        ? part
        : part
            .replace(/^(?:import|export) .*$/gm, "")
            .replace(/<[^>]*>/g, " ")
            .replace(/\]\([^)]*\)/g, "]")
    )
    .join(" ")
    .split(/\s+/)
    .filter((token) => /[\p{L}\p{N}]/u.test(token)).length
}

export const getReadingTime = (text: string): string | undefined => {
  const words = countWords(text)
  return words ? `${Math.ceil(words / WORDS_PER_MINUTE)} min read` : undefined
}
