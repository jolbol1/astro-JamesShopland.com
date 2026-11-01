import { getSecret } from "astro:env/server"

import { cached } from "./kv-cache"

const DEFAULT_YTDATA_URL = "https://ytdata.bstack-content.dev"
const HOST = "james"
const REQUEST_TIMEOUT_MS = 20_000

export type VideoFormat = "long" | "short"

export interface Video {
  id: string
  title: string
  publishedAt: string
  durationSeconds: number
  format: VideoFormat
  views: number
}

export interface VideoStats {
  /** Lifetime totals across the videos in the list. */
  videos: number
  views: number
  watchHours: number
  /** The whole Better Stack channel's, as YouTube shows it publicly. */
  channelSubscribers: number
}

interface VideoData {
  videos: Video[]
  stats: VideoStats
}

interface YtdataVideo {
  video_id: string
  title: string
  published_at: string | null
  duration_seconds: number | null
  format: string | null
  views: number | null
  watch_hours: number | null
}

/**
 * Loads the public videos I host from youtube-data. The response also carries
 * private channel analytics, so per video only the public fields are kept, and
 * the analytics only as lifetime totals.
 */
async function loadVideoData(token: string): Promise<VideoData> {
  const fetchYtdata = async <T>(
    path: string,
    params: Record<string, string>
  ) => {
    const url = new URL(
      `/api/v1/${path}`,
      getSecret("YTDATA_URL") ?? DEFAULT_YTDATA_URL
    )
    url.search = new URLSearchParams(params).toString()

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: ${response.status}`)
    }

    return response.json<T>()
  }

  const [data, channel] = await Promise.all([
    fetchYtdata<{ videos?: YtdataVideo[] }>("videos", {
      range: "all",
      host: HOST,
      privacy: "public",
      demos: "hide",
    }),
    fetchYtdata<{ channel?: { subscriber_count?: number | null } }>("channel", {
      range: "28d",
    }),
  ])

  const channelSubscribers = channel.channel?.subscriber_count
  if (!Array.isArray(data.videos) || typeof channelSubscribers !== "number") {
    throw new Error("Invalid youtube-data response")
  }

  const listed = data.videos.filter(
    (video) =>
      video.published_at &&
      (video.format === "long" || video.format === "short")
  )
  const sum = (pick: (video: YtdataVideo) => number | null) =>
    listed.reduce((total, video) => total + (pick(video) ?? 0), 0)

  return {
    videos: listed.map((video) => ({
      id: video.video_id,
      title: video.title,
      publishedAt: video.published_at as string,
      durationSeconds: video.duration_seconds ?? 0,
      format: video.format as VideoFormat,
      views: video.views ?? 0,
    })),
    stats: {
      videos: listed.length,
      views: sum((video) => video.views),
      watchHours: Math.round(sum((video) => video.watch_hours)),
      channelSubscribers,
    },
  }
}

async function getVideoData(): Promise<VideoData | null> {
  const token = getSecret("YTDATA_TOKEN")
  if (!token) {
    console.log("No YTDATA_TOKEN")
    return null
  }

  return cached({ key: "videos:v3", load: () => loadVideoData(token) })
}

/** Newest first, or null when youtube-data can't be reached. */
export async function getVideos(): Promise<Video[] | null> {
  return (await getVideoData())?.videos ?? null
}

export async function getVideoStats(): Promise<VideoStats | null> {
  return (await getVideoData())?.stats ?? null
}

export function videoUrl(video: Video) {
  return video.format === "short"
    ? `https://www.youtube.com/shorts/${video.id}`
    : `https://www.youtube.com/watch?v=${video.id}`
}

export function thumbnailUrl(id: string, size: "mq" | "hq") {
  return `https://i.ytimg.com/vi/${id}/${size}default.jpg`
}

const viewFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
})

const statFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumSignificantDigits: 3,
})

/** Three significant digits, e.g. 13.3M or 375K. */
export function formatStat(value: number) {
  return statFormatter.format(value)
}

export function formatViews(views: number) {
  return `${viewFormatter.format(views)} views`
}

export function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = String(totalSeconds % 60).padStart(2, "0")

  return hours
    ? `${hours}:${String(minutes).padStart(2, "0")}:${seconds}`
    : `${minutes}:${seconds}`
}
