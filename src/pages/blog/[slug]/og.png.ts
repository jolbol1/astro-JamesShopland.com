import { getPosts } from "@/lib/posts"

import { generateOG } from "@/components/generate-og"

interface Props {
  params: { slug: string }
  props: { title: string; subtitle: string }
}

export const GET = async ({ props: { title } }: Props) => {
  return await generateOG({ title })
}

export async function getStaticPaths() {
  const posts = await getPosts()
  return posts.map((post) => ({
    params: { slug: post.postSlug },
    props: {
      title: post.data.title,
    },
  }))
}
