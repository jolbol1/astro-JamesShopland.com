import Blockquote from "./Blockquote.astro"
import Callout from "./Callout.astro"
import Code from "./Code.astro"
import H1 from "./H1.astro"
import H2 from "./H2.astro"
import H3 from "./H3.astro"
import H4 from "./H4.astro"
import Hr from "./Hr.astro"
import Li from "./Li.astro"
import Ol from "./Ol.astro"
import P from "./P.astro"
import Table from "./Table.astro"
import Td from "./Td.astro"
import Th from "./Th.astro"
import Tr from "./Tr.astro"
import Ul from "./Ul.astro"

/** Element overrides for blog post MDX, passed to `<Content components>`. */
export const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  blockquote: Blockquote,
  tr: Tr,
  th: Th,
  td: Td,
  code: Code,
  hr: Hr,
  table: Table,
  Callout: Callout,
}
