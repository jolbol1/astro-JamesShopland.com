import { toString } from "hast-util-to-string"
import { h } from "hastscript"
import { escape } from "html-escaper"

const AnchorLinkIcon = h(
  "span",
  { ariaHidden: "true", class: "anchor-icon" },
  h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    [
      h("line", { x1: "4", x2: "20", y1: "9", y2: "9" }),
      h("line", { x1: "4", x2: "20", y1: "15", y2: "15" }),
      h("line", { x1: "10", x2: "8", y1: "3", y2: "21" }),
      h("line", { x1: "16", x2: "14", y1: "3", y2: "21" }),
    ]
  )
)

/**
 * Configuration for the `rehype-autolink-headings` plugin.
 * https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/
 */
export const autolinkConfig = {
  properties: { class: "anchor-link" },
  behavior: "after",
  group: ({ tagName }: { tagName: string }) =>
    h("div", {
      tabIndex: -1,
      class: `heading-wrapper ${
        tagName === "h2" ? "text-blue-11" : ""
      } level-${tagName}`,
    }),
  content: (heading: Parameters<typeof toString>[0]) => [
    AnchorLinkIcon,
    h(
      "span",
      { "is:raw": true, class: "sr-only" },
      `Section titled ${escape(toString(heading))}`
    ),
  ],
}
