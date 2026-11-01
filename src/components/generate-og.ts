import fs from "fs"
import path from "path"

import { ImageResponse } from "@vercel/og"

type Child = OgElement | string

/** The element shape Satori reads, which JSX would otherwise produce. */
interface OgElement {
  type: string
  props: Record<string, unknown>
}

const h = (
  type: string,
  props: Record<string, unknown>,
  ...children: Child[]
): OgElement => ({
  type,
  props: {
    ...props,
    children: children.length > 1 ? children : children[0],
  },
})

export const generateOG = async ({ title }: { title: string }) => {
  const fontBold = fs.readFileSync(
    path.resolve("./src/assets/fonts/Inter-Bold.ttf")
  )

  const heading = title.length > 140 ? `${title.substring(0, 140)}...` : title

  const paint = "#fff"

  const fontSize = heading.length > 30 ? "70px" : "100px"

  // Convert images to base64 strings
  const image1 = fs.readFileSync(
    path.resolve("./src/assets/images/logo-64x64.png")
  )
  const image2 = fs.readFileSync(path.resolve("./src/assets/images/icons.png"))

  const image1Base64 = `data:image/png;base64,${image1.toString("base64")}`
  const image2Base64 = `data:image/png;base64,${image2.toString("base64")}`

  const normal = { fontFamily: "Inter", fontWeight: "normal" }
  const bolder = {
    fontFamily: "Inter",
    fontWeight: "bolder",
    letterSpacing: "-0.05em",
    lineHeight: 1.1,
    marginLeft: "-3px",
  }

  const image = h(
    "div",
    {
      tw: "flex relative flex-col p-12 w-full h-full items-start",
      style: { color: paint, background: "black" },
    },
    h(
      "div",
      {
        tw: "flex font-bold items-center",
        style: { ...bolder, fontSize: "32px" },
      },
      h("img", { width: 64, height: 64, src: image1Base64 }),
      h("h1", { tw: "pl-4" }, "James Shopland")
    ),
    h(
      "div",
      { tw: "flex flex-col flex-1 " },
      h(
        "div",
        {
          tw: "flex text-xl uppercase font-bold tracking-tight",
          style: normal,
        },
        "BLOG POST"
      ),
      h(
        "div",
        { tw: "flex text-[80px] font-bold", style: { ...bolder, fontSize } },
        heading
      )
    ),
    h(
      "div",
      { tw: "flex items-center w-full justify-between" },
      h("div", { tw: "flex text-xl", style: normal }, "jamesshopland.com"),
      h(
        "div",
        { tw: "flex items-center text-xl", style: normal },
        h("img", { height: 86, src: image2Base64 })
      )
    )
  )

  // ImageResponse is typed for React elements; Satori only reads this shape.
  return new ImageResponse(image as never, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        data: fontBold,
        weight: 700,
        style: "normal",
      },
    ],
  })
}
