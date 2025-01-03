import { cva } from "class-variance-authority"
import { XIcon } from "lucide-react"
import {
  Button as AriaButton,
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  TagList as AriaTagList,
  composeRenderProps,
  type TagListProps as AriaTagListProps,
  type TagProps as AriaTagProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

const TagGroup = AriaTagGroup

function TagList<T extends object>({
  className,
  ...props
}: AriaTagListProps<T>) {
  return (
    <AriaTagList
      className={composeRenderProps(className, (className) =>
        cn(
          "flex flex-wrap gap-2",
          /* Empty */
          "data-[empty]:text-muted-foreground data-[empty]:text-sm",
          className
        )
      )}
      {...props}
    />
  )
}

const badgeVariants = cva(
  [
    "inline-flex cursor-pointer items-center gap-2 rounded-full px-2.5 py-0.5 text-sm font-semibold ring-offset-background transition-colors",
    /* Focus */
    "data-[focused]:outline-none data-[focused]:ring-2 data-[focused]:ring-blue-8 data-[focused]:ring-offset-2",
    /* Disabled */
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-blue-a-3 text-blue-a-11 px-3 rounded-lg",
          /* Hover */
          "data-[hovered]:bg-blue-a-4 data-[focus-visible]:bg-blue-a-4",
        ],
        secondary: [
          "bg-blue-a-3 text-blue-a-11 px-3 rounded-lg",
          /* Hover */
          "data-[hovered]:bg-blue-a-4 data-[focus-visible]:bg-blue-a-4",
        ],
        destructive: [
          "border-transparent bg-destructive text-destructive-foreground",
          /* Hover */
          "data-[hovered]:bg-destructive/80",
        ],
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Tag({ children, className, ...props }: AriaTagProps) {
  const textValue = typeof children === "string" ? children : undefined
  return (
    <AriaTag
      textValue={textValue}
      className={composeRenderProps(className, (className, renderProps) =>
        cn(
          badgeVariants({
            variant:
              renderProps.selectionMode === "none" || renderProps.isSelected
                ? "default"
                : "secondary",
          }),
          renderProps.allowsRemoving && "pr-1",
          className
        )
      )}
      {...props}
    >
      {composeRenderProps(children, (children, renderProps) => (
        <>
          {children}
          {renderProps.allowsRemoving && (
            <AriaButton
              slot="remove"
              className={cn(
                "rounded-sm opacity-70 ring-offset-background transition-opacity",
                /* Hover */
                "data-[hovered]:opacity-100",
                /* Resets */
                "focus-visible:outline-none",
                className
              )}
            >
              <XIcon aria-hidden className="size-3" />
            </AriaButton>
          )}
        </>
      ))}
    </AriaTag>
  )
}

export { TagGroup, TagList, Tag, badgeVariants }
