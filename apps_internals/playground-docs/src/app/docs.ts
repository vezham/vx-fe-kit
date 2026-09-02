import { defineDocs } from 'fumadocs-mdx/macro'

import {
  createStaticDocsRuntime,
  docsMetaSchema,
  docsPageSchema
} from '@vx/start/runtime/docs'

import { vxDocs, vxI18n } from '@generated/vx'

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    async: true,
    schema: docsPageSchema,
    postprocess: {
      includeProcessedMarkdown: true
    }
  },
  meta: {
    schema: docsMetaSchema
  }
})

const openapiFiles = import.meta.glob<string>('/openapi/**/*.{json,yaml,yml}', {
  eager: true,
  import: 'default',
  query: '?raw'
})

export const { getLLMText, i18n, preloadOpenAPIPage, source } =
  createStaticDocsRuntime({
    docs,
    docsRoute: vxDocs.docsRoute,
    i18n: vxI18n,
    openapiDir: vxDocs.openapiDir,
    openapiFiles
  })

export type Locale = (typeof i18n.languages)[number]
