import type { APIRoute } from "astro"

import rss, { type RSSFeedItem } from "@astrojs/rss"
import { siteConfig } from "site-config"

import { getPosts } from "@/lib/posts"

export const GET: APIRoute = async (context) => {
  const posts = await getPosts()

  return rss({
    // `<title>` field in output xml
    title: siteConfig.title,
    // `<description>` field in output xml
    description: siteConfig.description,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site ?? siteConfig.url,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: [
      ...posts.map(
        (post) =>
          ({
            title: post.data.title,
            description: post.data.summary,
            pubDate: post.data.date,
            link: `/blog/${post.postSlug}`,
          }) as RSSFeedItem
      ),
    ],
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  })
}
