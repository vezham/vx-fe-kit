import { defineDocs } from '@vezham/docs-mdx/macro'
import type { MacroAsyncDocsCollection } from '@vezham/docs-mdx/runtime/macro'

import { createStaticDocsRuntime } from '@vx/start/runtime/docs'

import { vxCore, vxDocs, vxI18n, vxMetadata } from '@generated/vx'

const collection = defineDocs({
  dir: 'content/docs',
  docs: {
    async: true,
    postprocess: { includeProcessedMarkdown: true }
  }
})

export const docs: MacroAsyncDocsCollection = collection

const openapiFiles = import.meta.glob<string>('/openapi/**/*.{json,yaml,yml}', {
  eager: true,
  import: 'default',
  query: '?raw'
})

export const {
  i18n,
  source,
  getDocsPage,
  getDocsRouteHead,
  getLLMText,
  createDocsLoader
} = createStaticDocsRuntime({
  i18n: vxI18n,
  docs,
  docsRoute: vxDocs.docsRoute,
  openapiDir: vxDocs.openapiDir,
  openapiFiles,
  head: {
    appName: vxCore.shortName,
    docsImageRoute: vxDocs.docsImageRoute,
    openGraphImage: vxMetadata.openGraph.image,
    openGraphImageSource: vxMetadata.openGraph.imageSource,
    siteDescription: vxMetadata.description,
    siteUrl: vxMetadata.url
  }
})
