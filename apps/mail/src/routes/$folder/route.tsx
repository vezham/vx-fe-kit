import { Outlet, createFileRoute, notFound } from '@tanstack/react-router'

import { getFolder, getThreadsForFolder } from '@/src/data/email'

import { FolderLayout } from '../../../src/components/folder-layout'

export const Route = createFileRoute('/$folder')({
  component: RouteComponent
})

function RouteComponent() {
  const { folder: folderId } = Route.useParams()

  const folder = getFolder(folderId)

  if (!folder) return notFound()

  const threads = getThreadsForFolder(folderId)

  return (
    <FolderLayout basePath="" folderId={folder.id} threads={threads}>
      <Outlet />
    </FolderLayout>
  )
}
