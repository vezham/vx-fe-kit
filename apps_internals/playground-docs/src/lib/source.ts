import { loader } from 'fumadocs-core/source'
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons'

import { docs } from './docs'
import { i18n } from './i18n'
import { openapi } from './openapi'
import { docsRoute } from './shared'

export const source = loader(
  {
    docs: docs.toFumadocsSource()
  },
  {
    baseUrl: docsRoute,
    i18n,
    plugins: [lucideIconsPlugin(), openapi.loaderPlugin()]
  }
)

function getOpenAPIDocumentId(page: (typeof source)['$inferPage']) {
  const preload = (page.data as { _openapi?: { preload?: unknown } })._openapi
    ?.preload

  return Array.isArray(preload) && typeof preload[0] === 'string'
    ? preload[0]
    : undefined
}

export async function preloadOpenAPIPage(page: (typeof source)['$inferPage']) {
  return getOpenAPIDocumentId(page)
    ? openapi.preloadOpenAPIPage(page)
    : undefined
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const documentId = getOpenAPIDocumentId(page)

  if (documentId) {
    return JSON.stringify(await openapi.getSchema(documentId), null, 2)
  }

  const processed = await page.data.getText('processed')

  return `# ${page.data.title} (${page.url})

${processed}`
}
