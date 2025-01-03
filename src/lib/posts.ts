import { getCollection } from "astro:content"
import kebabCase from "lodash.kebabcase"

import type { Tag } from "@/types/types"

import { formatDate } from "./date"
import { getReadingTime } from "./reading-time"

export async function getPosts(limit?: number, includeDrafts: boolean = false) {
  const posts = (await getCollection("blog"))
    .filter((post) => (includeDrafts ? true : post.data.draft !== true))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, limit)
    .map((post) => ({
      ...post,
      readingTime: getReadingTime(post.body ?? ""),
      formattedDate: formatDate(post.data.date),
      formattedTags: post.data.tags?.map((tag) => ({
        tag: tag.toLowerCase(),
        slug: kebabCase(tag.toLowerCase()),
      })),
    }))

  return posts
}

export async function getTags(limit?: number): Promise<Tag[]> {
  const posts = await getPosts()

  // Get all tags from all posts and flatten into single array
  const allTags = posts.flatMap((post) => post.formattedTags ?? [])

  // Count occurrences of each tag
  const tagCounts = allTags.reduce(
    (acc, tag) => {
      const key = tag.slug
      acc[key] = {
        count: (acc[key]?.count || 0) + 1,
        tag: tag.tag,
        slug: tag.slug,
      }
      return acc
    },
    {} as Record<string, { count: number; tag: string; slug: string }>
  )

  // Convert to array and sort by count (descending)
  const sortedTags = Object.values(tagCounts)
    .sort((a, b) => b.count - a.count)
    .map(({ tag, slug }) => ({ tag, slug }))
    .slice(0, limit)

  return sortedTags
}
