import { Route, notFound, useParams } from '@tanstack/react-router'

import { EmptyState } from '../../components/empty-state'
import { getFolder } from '../../data/email'

export default function Page() {
  const { folder: folderId } = useParams({ strict: false })

  const folder = getFolder(folderId || '')

  if (!folder) return notFound()

  return <EmptyState folder={folder} />
}
