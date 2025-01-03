import {
  GridList,
  GridListItem,
  type GridListProps as AriaGridListProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

import { Link } from "@/components/ui/link"

interface Channel {
  id: string
  name: string
  subscribers: string
  image: string
  url: string
}

interface ChannelCardsProps extends AriaGridListProps<Channel> {
  channels: Channel[]
}

export function ChannelCards({ channels, ...props }: ChannelCardsProps) {
  return (
    <GridList
      items={channels}
      className="flex w-full flex-col gap-4 md:flex-row"
      layout="grid"
      {...props}
    >
      {(item) => (
        <GridListItem
          textValue={[item.name, item.id, item.subscribers].join("\n")}
          href={item.url}
          className={cn(
            "w-full cursor-pointer rounded-xl border bg-gray-a-2 ring-offset-background transition-colors data-[hovered]:shadow-card-classic sm:max-w-96",
            /* Focus Visible */
            "data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-blue-8 data-[focus-visible]:ring-offset-2 ",
            /* Resets */
            "focus-visible:outline-none"
          )}
        >
          <div className="flex flex-row items-center justify-between space-y-1.5 p-6">
            <div className="flex items-center space-x-4">
              <span className="relative flex size-10 shrink-0 overflow-hidden rounded-full">
                <img
                  className="aspect-square size-full"
                  alt=""
                  src={item.image}
                />
              </span>
              <div>
                <p className="text-sm font-medium leading-none">{item.name}</p>
                <p className="text-sm text-gray-a-11">{item.id}</p>
                <p className="mt-1 text-xs text-gray-a-11">
                  {item.subscribers} Subscribers
                </p>
              </div>
            </div>
            <Link
              href={item.url}
              className="hidden [@media(min-width:400px)]:flex"
              target="_blank"
              variant="secondary"
            >
              Subscribe
            </Link>
          </div>
        </GridListItem>
      )}
    </GridList>
  )
}
