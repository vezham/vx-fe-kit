import { Outlet, createFileRoute, notFound } from '@tanstack/react-router'

import { getFolder, getThreadsForFolder } from '@/src/utils/email'

import { FolderLayout } from '../../../src/components/folder-layout'

export const Route = createFileRoute('/$folder')({
  beforeLoad: ({ params }) => {
    const folder = getFolder(params.folder)

    if (!folder) {
      throw notFound()
    }

    return {
      folder,
      threads: getThreadsForFolder(params.folder)
    }
  },

  component: RouteComponent
})

function RouteComponent() {
  const { folder, threads } = Route.useRouteContext()

  return (
    <FolderLayout basePath="" folderId={folder.id} threads={threads}>
      <Outlet />
    </FolderLayout>
  )
}

// =========================================================== loader ===========================

// export const Route = createFileRoute('/$folder')({
//   loader: ({ params }) => {
//     const folder = getFolder(params.folder)

//     if (!folder) {
//       throw notFound()
//     }

//     return {
//       folder,
//       threads: getThreadsForFolder(params.folder),
//     }
//   },

//   component: RouteComponent,
// })

// function RouteComponent() {
//   const { folder, threads } = Route.useLoaderData()

//   return (
//     <FolderLayout
//       basePath=""
//       folderId={folder.id}
//       threads={threads}
//     >
//       <Outlet />
//     </FolderLayout>
//   )
// }
