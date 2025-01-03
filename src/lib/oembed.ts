import { type TransformerInfo } from "@remark-embedder/core"
import oembedTransformer from "@remark-embedder/transformer-oembed"

function handleEmbedderError({ url }: { url: string }) {
  return `<p>Error embedding <a href="${url}">${url}</a></p>.`
}

type GottenHTML = string | null
function handleEmbedderHtml(html: GottenHTML, info: TransformerInfo) {
  if (!html) return null

  const url = new URL(info.url)
  // matches youtu.be and youtube.com
  if (/youtu\.?be/.test(url.hostname)) {
    // this allows us to set youtube embeds to 100% width and the
    // height will be relative to that width with a good aspect ratio
    return makeEmbed(html, "youtube")
  }
  if (url.hostname.includes("codesandbox.io")) {
    return makeEmbed(html, "codesandbox", "80%")
  }
  return html
}

function makeEmbed(html: string, type: string, heightRatio = "56.25%") {
  return `
    <div class="embed" data-embed-type="${type}">
      <div style="padding-bottom: ${heightRatio}">
        ${html}
      </div>
    </div>
  `
}

export const remarkOembedOptions = {
  handleError: handleEmbedderError,
  handleHTML: handleEmbedderHtml,
  // @ts-expect-error oembed error
  transformers: [oembedTransformer.default],
}
