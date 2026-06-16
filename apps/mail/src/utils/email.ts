import { DEFAULT_FOLDER_ID, FOLDERS, LABELS } from '../data/data'
import {
  EmailFolder,
  EmailFolderId,
  EmailLabel,
  EmailThread
} from '../data/types'
import { THREADS } from '../store/useEmail/data'

export function getLabel(id: string): EmailLabel | undefined {
  return LABELS.find(label => label.id === id)
}

export function getFolder(id: string): EmailFolder | undefined {
  return FOLDERS.find(folder => folder.id === id)
}

export function getThread(id: string): EmailThread | undefined {
  return THREADS.find(thread => thread.id === id)
}

export function getThreadsForFolder(folderId: string): readonly EmailThread[] {
  if (folderId === 'starred') return THREADS.filter(thread => thread.isStarred)

  return THREADS.filter(thread => thread.folderId === folderId)
}

export const FOLDER_UNREAD_COUNTS: Readonly<Record<EmailFolderId, number>> =
  (() => {
    const counts = Object.fromEntries(
      FOLDERS.map(folder => [folder.id, 0])
    ) as Record<EmailFolderId, number>

    for (const thread of THREADS) {
      if (thread.isRead) continue
      counts[thread.folderId] += 1
      if (thread.isStarred) counts.starred += 1
    }

    return counts
  })()

export type EmailActivePage =
  | { kind: 'folder'; folder: EmailFolder; threadId?: string }
  | { kind: 'unknown' }

export function resolveEmailActivePage(
  pathname: string,
  basePath: string
): EmailActivePage {
  const trimmedBase = basePath.replace(/\/$/, '')
  const raw = pathname.startsWith(trimmedBase)
    ? pathname.slice(trimmedBase.length)
    : pathname
  const segments = raw.replace(/^\//, '').split('/').filter(Boolean)

  const [folderSegment, emailSegment] = segments
  const folderId = folderSegment || DEFAULT_FOLDER_ID
  const folder = getFolder(folderId)

  if (!folder) return { kind: 'unknown' }

  return { folder, kind: 'folder', threadId: emailSegment || undefined }
}
