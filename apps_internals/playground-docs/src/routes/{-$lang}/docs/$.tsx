import { createFileRoute } from '@tanstack/react-router'

import {
  DocsRoutePage,
  getDocsRouteHead,
  loadDocsPage,
  preloadDocsPage
} from '@src/components/docs-page'
import { resolveLocale } from '@src/lib/i18n'

export const Route = createFileRoute('/{-$lang}/docs/$')({
  component: Page,
  head: ({ loaderData }) => getDocsRouteHead(loaderData),
  loader: async ({ params }) => {
    const lang = resolveLocale(params.lang)
    const slugs = params._splat?.split('/') ?? []
    const data = await loadDocsPage(slugs, lang)

    await preloadDocsPage(data)

    return data
  }
})

function Page() {
  return <DocsRoutePage data={Route.useLoaderData()} />
}
