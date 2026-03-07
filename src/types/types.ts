import type { CollectionEntry } from "astro:content"

export interface BaseHeadProps {
  title: string
  description?: string
  articleDate?: string
  articleUpdatedDate?: string
  tags?: string[]
}

export interface Tag {
  tag: string
  slug: string
}

export interface Post extends CollectionEntry<"blog"> {
  readingTime: string
  postSlug: string
  formattedDate: string
  formattedUpdatedDate: string
  formattedTags: Tag[]
}
