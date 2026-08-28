import { createFileRoute } from '@tanstack/react-router'

import { getDocsRouteHead, loadDocsPage } from '@app/docs-page'
import { DocsRoutePage } from '@layouts/docs'

export const Route = createFileRoute('/{-$lang}/ui-docs/$')({
  component: function PageRoute() {
    return <DocsRoutePage data={Route.useLoaderData()} />
  },
  head: ({ loaderData }) => getDocsRouteHead(loaderData),
  loader: async ({ params }) => {
    const data = await loadDocsPage({
      slugs: params._splat?.split('/') ?? [],
      lang: params.lang,
      routeBase: '/ui-docs'
    })

    return data
  }
})
