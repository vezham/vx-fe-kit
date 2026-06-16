import { createFileRoute, notFound } from '@tanstack/react-router'

import { EmptyState } from '@/src/components/empty-state'
import { getFolder } from '@/src/utils/email'

export const Route = createFileRoute('/$folder/')({
  beforeLoad: ({ params }) => {
    const folder = getFolder(params.folder)

    if (!folder) {
      throw notFound()
    }

    return { folder }
  },

  component: RouteComponent
})

function RouteComponent() {
  const { folder } = Route.useRouteContext()

  return <EmptyState folder={folder} />
}

// =========================================================== loader ===========================

// export const Route = createFileRoute('/$folder/')({
//   loader: ({ params }) => {
//     const folder = getFolder(params.folder)

//     if (!folder) {
//       throw notFound()
//     }

//     return { folder }
//   },

//   component: RouteComponent,
// })

// function RouteComponent() {
//   const { folder } = Route.useLoaderData()

//   return <EmptyState folder={folder} />
// }
