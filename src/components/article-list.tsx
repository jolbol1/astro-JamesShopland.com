import { ArrowRightIcon } from "lucide-react"
import {
  GridList,
  GridListItem,
  Link,
  type GridListProps,
} from "react-aria-components"

import type { Post } from "@/types/types"

import { cn } from "@/lib/utils"

interface ArticleListProps extends GridListProps<Post> {
  posts: Post[]
}

export function ArticleList({ posts, ...props }: ArticleListProps) {
  return (
    <GridList
      items={posts}
      selectionMode="none"
      className="-me-2 -ms-2 sm:-me-4 sm:-ms-4"
      {...props}
    >
      {(item) => (
        <GridListItem
          href={`/blog/${item.postSlug}/`}
          textValue={[item.data.title, item.data.date, item.data.summary].join(
            "\n"
          )}
          className={cn(
            "group border-b border-gray-a-6  py-6 pl-2 first:pt-4 sm:pl-4",
            "ring-offset-background transition-colors",
            /* Hover */
            "data-[hovered]:cursor-pointer data-[hovered]:bg-gray-a-2",
            /* Focus Visible */
            "data-[focus-visible]:bg-gray-a-2 data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-blue-8",
            /* Resets */
            "focus-visible:outline-none"
          )}
        >
          <Link
            href={`/blog/${item.postSlug}/`}
            className={cn(
              "text-xl font-bold group-data-[focus-visible]:underline group-data-[hovered]:underline",
              "ring-offset-background transition-colors",
              /* Focus Visible */
              "data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-blue-8",
              /* Resets */
              "focus-visible:outline-none"
            )}
          >
            {item.data.title}
          </Link>
          <p className="mt-1 text-sm text-gray-a-11 ">
            {item.formattedDate} — {item.readingTime}
          </p>

          <p className="mt-4">{item.data.summary}</p>
        </GridListItem>
      )}
    </GridList>
  )
}

export function ArticleListMin({ posts, ...props }: ArticleListProps) {
  return (
    <GridList
      items={posts}
      selectionMode="none"
      className="flex flex-col gap-4 p-0"
      {...props}
    >
      {(item) => (
        <GridListItem
          href={`/blog/${item.postSlug}`}
          textValue={item.data.title}
          className={cn(
            "group gap-4 p-0",
            "ring-offset-background transition-colors",
            /* Hover */
            "data-[hovered]:cursor-pointer data-[hovered]:underline",
            /* Focus Visible */
            "data-[focus-visible]:bg-gray-a-2 data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-blue-8",
            /* Resets */
            "focus-visible:outline-none"
          )}
        >
          <Link href={`/blog/${item.id}`} className="flex gap-1 font-medium">
            <ArrowRightIcon className="h-full w-4 min-w-4 pt-[4px]" />
            {item.data.title}
          </Link>
        </GridListItem>
      )}
    </GridList>
  )
}
