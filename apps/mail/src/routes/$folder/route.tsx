import { Outlet, createFileRoute, notFound } from '@tanstack/react-router'

import { FolderLayout } from '@/src/components/folder-layout'
import { TextContentSkeleton } from '@/src/components/skeleton'
import { getFolder } from '@/src/utils/email'

export const Route = createFileRoute('/$folder')({
  loader: ({ params }) => {
    const folder = getFolder(params.folder)

    if (!folder) {
      throw notFound()
    }

    return { folder }
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
  const { folder } = Route.useLoaderData()

  return (
    <FolderLayout basePath="" folderId={folder.id}>
      <Outlet />
    </FolderLayout>
  )
}

//======================================================= beforeload ============================

// export const Route = createFileRoute('/$folder')({
//   beforeLoad: ({ params }) => {
//     const folder = getFolder(params.folder)
//
//     if (!folder) {
//       throw notFound()
//     }
//
//     return { folder }
//   },
//
//   component: RouteComponent
// })

// function RouteComponent() {
//   const { folder } = Route.useRouteContext()
//
//   return (
//     <FolderLayout basePath="" folderId={folder.id}>
//       <Outlet />
//     </FolderLayout>
//   )
// }

// =========================================================== loader ===========================

// export const Route = createFileRoute('/$folder')({
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
//   const { folder } = Route.useLoaderData()
//
//   return (
//     <FolderLayout basePath="" folderId={folder.id}>
//       <Outlet />
//     </FolderLayout>
//   )
// }
