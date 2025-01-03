import type { Selection, TagGroupProps } from "react-aria-components"

import type { Tag as TagType } from "@/types/types"

import { cn } from "@/lib/utils"

import { Tag, TagGroup, TagList } from "./ui/tag-group"

interface CategoryListProps extends TagGroupProps {
  categories: TagType[]
  slug?: string
}

export function CategoryList({
  categories,
  slug,
  ...props
}: CategoryListProps) {
  return (
    <TagGroup
      selectionMode="single"
      selectedKeys={new Set([slug]) as Selection}
      {...props}
    >
      <TagList items={categories}>
        {(item) => (
          <Tag
            id={item.slug}
            href={item.slug === slug ? "/blog" : `/tags/${item.slug}`}
            className={(props) =>
              cn(
                "font-medium hover:bg-blue-4",
                props.isSelected &&
                  "bg-blue-a-9 text-blue-contrast hover:bg-blue-a-10 data-[pressed]:bg-blue-a-10 data-[pressed]:brightness-[1.08]"
              )
            }
          >
            {item.tag}
          </Tag>
        )}
      </TagList>
    </TagGroup>
  )
}
