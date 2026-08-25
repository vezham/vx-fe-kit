import { createFileRoute } from '@tanstack/react-router'

import {
  DocsRoutePage,
  getDocsRouteHead,
  loadDocsPage,
  preloadDocsPage
} from '@src/components/docs-page'
import { i18n } from '@src/lib/i18n'

export const Route = createFileRoute('/ui-docs/$')({
  component: Page,
  head: ({ loaderData }) => getDocsRouteHead(loaderData),
  loader: async ({ params }) => {
    const slugs = params._splat?.split('/') ?? []
    const data = await loadDocsPage(slugs, i18n.defaultLanguage, '/ui-docs')

    await preloadDocsPage(data)

    return data
  }
})

function Page() {
  return <DocsRoutePage data={Route.useLoaderData()} />
}
