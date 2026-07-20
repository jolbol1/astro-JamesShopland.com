import { Fragment } from "react"

import { fetchJson } from "@/lib/fetch-json"

const timelineDataUrl =
  "https://graphql.justgiving.com/?operationName=ListTimelineEntries&variables=%7B%22type%22%3A%22ONE_PAGE%22%2C%22slug%22%3A%22page%2Fjames-shopland%22%2C%22measurementSystem%22%3A%22IMPERIAL%22%2C%22first%22%3A3%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%227e52c2dab36016e39a126ead2c4c8f0f412c78de166a7a5d789d9dcf2a2f0a77%22%7D%7D"

interface TimelineItem {
  id: string
  message: string
  media?: Array<{ url?: string }>
}

interface TimelineData {
  data?: {
    page?: {
      timeline?: { nodes?: unknown }
    }
  }
}

function isTimelineItem(item: unknown): item is TimelineItem {
  if (!item || typeof item !== "object") return false

  const candidate = item as Partial<TimelineItem>
  return (
    typeof candidate.id === "string" && typeof candidate.message === "string"
  )
}

export default async function JustGivingUpdates() {
  const posts = await fetchJson<TimelineData>(timelineDataUrl)
  const nodes = posts?.data?.page?.timeline?.nodes
  const timeline = Array.isArray(nodes) ? nodes.filter(isTimelineItem) : []

  return (
    <>
      {timeline.map((item, index) => {
        const updateCount = timeline.length - index
        const rawMediaUrl = item.media?.[0]?.url
        const mediaUrl =
          typeof rawMediaUrl === "string"
            ? rawMediaUrl.replace(/^http:\/\//, "https://")
            : undefined
        return (
          <Fragment key={item.id}>
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-black dark:text-white">
              Update {updateCount}
            </h3>

            <p className="mt-2 whitespace-pre-line">{item.message}</p>
            {mediaUrl && (
              <img
                className="mx-auto my-3 w-full max-w-[500px]"
                src={mediaUrl}
                alt={`update ${updateCount}`}
                loading="lazy"
              />
            )}
          </Fragment>
        )
      })}
    </>
  )
}
