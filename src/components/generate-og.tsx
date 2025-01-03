import fs from "fs"
import path from "path"

import { ImageResponse } from "@vercel/og"

export const generateOG = async ({ title }: { title: string }) => {
  const fontBold = fs.readFileSync(
    path.resolve("./public/fonts/Inter-Bold.ttf")
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

  return new ImageResponse(
    (
      <div
        tw="flex relative flex-col p-12 w-full h-full items-start"
        style={{
          color: paint,
          background: "black",
        }}
      >
        <div
          tw="flex leading-[1.1] font-bold tracking-tighter items-center"
          style={{
            fontFamily: "Inter",
            fontWeight: "bolder",
            marginLeft: "-3px",
            fontSize: "32px",
          }}
        >
          <img width="64" height="64" src={image1Base64} />
          <h1 tw="pl-4">James Shopland</h1>
        </div>

        <div tw="flex flex-col flex-1 ">
          <div
            tw="flex text-xl uppercase font-bold tracking-tight"
            style={{ fontFamily: "Inter", fontWeight: "normal" }}
          >
            BLOG POST
          </div>
          <div
            tw="flex leading-[1.1] text-[80px] font-bold tracking-tighter"
            style={{
              fontFamily: "Inter",
              fontWeight: "bolder",
              marginLeft: "-3px",
              fontSize,
            }}
          >
            {heading}
          </div>
        </div>
        <div tw="flex items-center w-full justify-between">
          <div
            tw="flex text-xl"
            style={{ fontFamily: "Inter", fontWeight: "normal" }}
          >
            jamesshopland.com
          </div>
          <div
            tw="flex items-center text-xl"
            style={{ fontFamily: "Inter", fontWeight: "normal" }}
          >
            <img height="86" src={image2Base64} />
          </div>
        </div>
      </div>
    ),
    {
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
    }
  )
}
