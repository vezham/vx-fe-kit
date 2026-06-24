import { notFound } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { getFolder } from '@/src/utils/email'

import { FolderLayout } from '../../components/folder-layout'

export default async function Layout({
  children,
  params
}: {
  children: ReactNode
  params: Promise<{ folder: string }>
}) {
  const { folder: folderId } = await params
  const folder = getFolder(folderId)

  if (!folder) return notFound()

  return (
    <FolderLayout basePath="" folderId={folder.id}>
      {children}
    </FolderLayout>
  )
}
