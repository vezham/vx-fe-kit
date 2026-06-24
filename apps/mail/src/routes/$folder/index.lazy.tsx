import { createLazyFileRoute, notFound } from '@tanstack/react-router'

import { EmptyState } from '@/src/components/empty-state'
import { getFolder } from '@/src/utils/email'

export const Route = createLazyFileRoute('/$folder/')({
  component: RouteComponent
})

function RouteComponent() {
  const { folder: folderId } = Route.useParams()
  const folder = getFolder(folderId)

  if (!folder) return notFound()

  return <EmptyState folder={folder} />
}
