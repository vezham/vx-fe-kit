import { loader } from 'fumadocs-core/source'
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons'

import { docs } from './docs'
import { i18n } from './i18n'
import { openapi } from './openapi'
import { docsRoute } from './shared'

export const source = loader(
  {
    docs: docs.toFumadocsSource(),
    openapi: await openapi.staticSource({
      baseDir: 'openapi'
    })
  },
  {
    baseUrl: docsRoute,
    i18n,
    plugins: [lucideIconsPlugin(), openapi.loaderPlugin()]
  }
)

export async function getLLMText(page: (typeof source)['$inferPage']) {
  if (page.type === 'openapi') {
    return JSON.stringify(page.data.getSchema(), null, 2)
  }

  const processed = await page.data.getText('processed')

  return `# ${page.data.title} (${page.url})

${processed}`
}
