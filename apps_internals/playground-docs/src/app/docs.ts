import { defineDocs } from 'fumadocs-mdx/macro'

import {
  createDocsI18n,
  createDocsRuntime,
  createOpenAPIFromSources
} from '@vx/start/runtime/docs'

import { vxDocs, vxI18n } from '@generated/vx'

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    async: true,
    postprocess: {
      includeProcessedMarkdown: true
    }
  }
})

export const i18n = createDocsI18n(vxI18n)

export type Locale = (typeof i18n.languages)[number]

const openapiFiles = {
  ...import.meta.glob<string>('../../openapi/**/*.json', {
    eager: true,
    import: 'default',
    query: '?raw'
  }),
  ...import.meta.glob<string>('../../openapi/**/*.yaml', {
    eager: true,
    import: 'default',
    query: '?raw'
  }),
  ...import.meta.glob<string>('../../openapi/**/*.yml', {
    eager: true,
    import: 'default',
    query: '?raw'
  })
}

const openapi = createOpenAPIFromSources({
  files: openapiFiles
})

export const { getLLMText, preloadOpenAPIPage, source } = createDocsRuntime({
  docs: docs.toFumadocsSource(),
  docsRoute: vxDocs.docsRoute,
  i18n,
  openapi
})
