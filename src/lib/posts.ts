import { getCollection } from "astro:content"
import kebabCase from "lodash.kebabcase"

import type { Post, Tag } from "@/types/types"

import { formatDate } from "./date"
import { getReadingTime } from "./reading-time"

export async function getPosts(
  limit?: number,
  includeDrafts: boolean = false,
  tagSlug?: string
) {
  const posts = (await getCollection("blog"))
    .filter((post) => (includeDrafts ? true : post.data.draft !== true))
    .filter((post) => {
      if (!tagSlug) return true
      return post.data.tags?.some(
        (tag) => kebabCase(tag.toLowerCase()) === tagSlug
      )
    })
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, limit)
    .map((post) => ({
      ...post,
      readingTime: getReadingTime(post.body ?? ""),
      postSlug: kebabCase(post.id.toLowerCase()),
      formattedDate: formatDate(post.data.date),
      formattedUpdatedDate: post.data.updatedDate
        ? formatDate(post.data.updatedDate)
        : undefined,
      formattedTags: post.data.tags?.map((tag) => ({
        tag: tag.toLowerCase(),
        slug: kebabCase(tag.toLowerCase()),
      })),
    }))

  return posts as Post[]
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
