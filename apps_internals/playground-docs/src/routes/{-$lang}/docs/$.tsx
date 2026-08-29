import { createFileRoute } from '@tanstack/react-router'

import { DocsRoutePage } from '@vx/start/pages/docs/route'

import { docs } from '@app/docs'
import {
  type LoadedDocsPage,
  getDocsRouteHead,
  loadDocsPage
} from '@app/docs-page'
import { baseOptions } from '@config/layout'

export const Route = createFileRoute('/{-$lang}/docs/$')({
  component: function RouteComponent() {
    const data = Route.useLoaderData() as LoadedDocsPage

    return (
      <DocsRoutePage data={data} docs={docs} getLayoutOptions={baseOptions} />
    )
  },
  head: ({ loaderData }) => getDocsRouteHead(loaderData),
  loader: async ({ params }) => {
    const data = await loadDocsPage({
      slugs: params._splat?.split('/') ?? [],
      lang: params.lang
    })

    return data
  }
})
