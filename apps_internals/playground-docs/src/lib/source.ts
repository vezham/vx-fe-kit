import {
  createDocsSource,
  getDocsLLMText,
  preloadDocsOpenAPIPage
} from '@vx/start/runtime/docs'

import { docs } from './docs'
import { i18n } from './i18n'
import { openapi } from './openapi'
import { docsRoute } from './shared'

export const source = createDocsSource({
  docs: docs.toFumadocsSource(),
  docsRoute,
  i18n,
  openapi
})

export async function preloadOpenAPIPage(page: (typeof source)['$inferPage']) {
  return preloadDocsOpenAPIPage(page, openapi)
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  return getDocsLLMText(page, openapi)
}
