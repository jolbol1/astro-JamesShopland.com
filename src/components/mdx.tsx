import * as React from "react"

import type { MDXComponents } from "mdx/types"

import { cn } from "@/lib/utils"

export const components: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      data-heading-toc
      className={cn(
        "text-pretty break-words text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      data-heading-toc
      className={cn(
        " text-pretty break-words text-3xl font-semibold tracking-tight text-blue-11 first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        " text-pretty break-words text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        " text-pretty break-words text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn(
        "mb-6 text-pretty break-words text-lg leading-7 last:mb-0",
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("mb-4 pl-4 text-lg", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr
      className={cn("h-px w-full shrink-0 bg-gray-a-6", className)}
      {...props}
    />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="w-full">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("even:bg-muted m-0 border-t p-0", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "relative rounded bg-gray-a-2 px-[0.3rem] py-[0.2rem] font-mono text-lg font-semibold",
        className
      )}
      {...props}
    />
  ),
  Callout: ({ children, type, ...props }) => (
    <aside
      className={cn(
        "my-6 -me-2 -ms-2 flex items-start border-l-4 border-blue-9 bg-blue-a-3 p-4 sm:-me-4 sm:-ms-4",
        type === "danger" && "border-[#FF0000] bg-[#FFE9E5] dark:bg-[#3F0F0B]"
      )}
      {...props}
    >
      <div>{children}</div>
    </aside>
  ),
}
