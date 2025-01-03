import { ActionError, defineAction } from "astro:actions"
import { blogViews, db, sql } from "astro:db"
import { z } from "astro:schema"
import { isbot } from "isbot"

export const server = {
  pageView: defineAction({
    input: z.object({
      slug: z.string(),
    }),
    handler: async ({ slug }, context) => {
      const { request } = context

      if (isbot(request.headers.get("user-agent"))) {
        throw new ActionError({
          code: "FORBIDDEN",
          message: "This endpoint is not available for bots",
        })
      }

      let item
      try {
        item = await db
          .insert(blogViews)
          .values({
            slug: slug,
            count: 1,
          })
          .onConflictDoUpdate({
            target: blogViews.slug,
            set: {
              count: sql`count + 1`,
            },
          })
          .returning({
            slug: blogViews.slug,
            count: blogViews.count,
          })
          .then((res) => res[0])

        return item
      } catch (e) {
        console.error(e)
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Error updating views",
        })
      }
    },
  }),
}
