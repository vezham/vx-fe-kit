import { Outlet, createFileRoute, notFound } from '@tanstack/react-router'

import { FolderLayout } from '@/src/components/folder-layout'
import { TextContentSkeleton } from '@/src/components/skeleton'
import { getFolder, getThreadsForFolder } from '@/src/utils/email'

export const Route = createFileRoute('/$folder')({
  loader: ({ params }) => {
    const folder = getFolder(params.folder)

    if (!folder) {
      throw notFound()
    }

    return {
      folder,
      threads: getThreadsForFolder(params.folder)
    }
  },

  pendingComponent: () => (
    <div className="p-6">
      <TextContentSkeleton />
    </div>
  ),

  pendingMs: 0,

  component: RouteComponent
})

function RouteComponent() {
  const { folder, threads } = Route.useLoaderData()

  return (
    <FolderLayout basePath="" folderId={folder.id} threads={threads}>
      <Outlet />
    </FolderLayout>
  )
}

//======================================================= beforeload ============================

// export const Route = createFileRoute('/$folder')({
//   beforeLoad: ({ params }) => {
//     const folder = getFolder(params.folder)

//     if (!folder) {
//       throw notFound()
//     }

//     return {
//       folder,
//       threads: getThreadsForFolder(params.folder)
//     }
//   },

//   component: RouteComponent
// })

// function RouteComponent() {
//   const { folder, threads } = Route.useRouteContext()

//   return (
//     <FolderLayout basePath="" folderId={folder.id} threads={threads}>
//       <Outlet />
//     </FolderLayout>
//   )
// }

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
