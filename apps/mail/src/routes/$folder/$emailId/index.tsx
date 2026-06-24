import { createFileRoute, notFound } from '@tanstack/react-router'

import { EmailDetail } from '@/src/components/email-detail'
import { getFolder } from '@/src/utils/email'

export const Route = createFileRoute('/$folder/$emailId/')({
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
  const { folder, emailId } = Route.useParams()

  return (
    <EmailDetail backHref={`/${folder}`} folderId={folder} mailId={emailId} />
  )
}

// =========================================================== loader ===========================

// export const Route = createFileRoute('/$folder/$emailId/')({
//   loader: ({ params }) => {
//     const folder = getFolder(params.folder)
//
//     if (!folder) {
//       throw notFound()
//     }
//
//     return { folder }
//   },
//
//   component: RouteComponent,
// })

// function RouteComponent() {
//   const { folder, emailId } = Route.useParams()
//
//   return (
//     <EmailDetail backHref={`/${folder}`} folderId={folder} mailId={emailId} />
//   )
// }
