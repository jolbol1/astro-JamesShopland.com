export interface Channel {
  id: string
  name: string
  subscribers: string | null
  image: string
  url: string
  /** Take the count from youtube-data, like the homepage stats strip. */
  subscribersFromYtdata?: boolean
}

export const channels: Channel[] = [
  {
    name: "Better Stack",
    subscribers: null,
    id: "@betterstack",
    image: "/betterstack.jpg",
    url: "https://www.youtube.com/@betterstack",
    subscribersFromYtdata: true,
  },
  {
    name: "Jolly Coding",
    subscribers: null,
    id: "@jollycoding",
    image: "/jollycoding.jpg",
    url: "https://www.youtube.com/@jollycoding",
  },
]
