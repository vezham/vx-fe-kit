import { createFileRoute, notFound } from '@tanstack/react-router'

import { EmailDetail } from '@/src/components/email-detail'
import { getThread } from '@/src/utils/email'

export const Route = createFileRoute('/$folder/$emailId/')({
  beforeLoad: ({ params }) => {
    const thread = getThread(params.emailId)

    if (!thread) {
      throw notFound()
    }

    return { thread }
  },

  component: RouteComponent
})

function RouteComponent() {
  const { folder } = Route.useParams()
  const { thread } = Route.useRouteContext()

  return <EmailDetail backHref={`/${folder}`} thread={thread} />
}

// =========================================================== loader ===========================

// export const Route = createFileRoute('/$folder/$emailId/')({
//   loader: ({ params }) => {
//     const thread = getThread(params.emailId)
//     if (!thread) {
//       throw notFound()
//     }
//     return { thread }
//   },

//   component: RouteComponent,
// })

// function RouteComponent() {
//   const { folder } = Route.useParams()
//   const { thread } = Route.useLoaderData()

//   return (
//     <EmailDetail
//       backHref={`/${folder}`}
//       thread={thread}
//     />
//   )
// }
