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
