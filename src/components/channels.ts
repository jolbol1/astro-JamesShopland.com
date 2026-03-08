export interface Channel {
  id: string
  name: string
  subscribers: string | null
  image: string
  url: string
}

export const channels: Channel[] = [
  {
    name: "Better Stack",
    subscribers: null,
    id: "@betterstack",
    image: "/betterstack.jpg",
    url: "https://www.youtube.com/@betterstack",
  },
  {
    name: "Jolly Coding",
    subscribers: null,
    id: "@jollycoding",
    image: "/jollycoding.jpg",
    url: "https://www.youtube.com/@jollycoding",
  },
]
