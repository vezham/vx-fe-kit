import { DEFAULT_FOLDER_ID, FOLDERS, LABELS } from '../data/data'
import {
  EmailFolder,
  EmailFolderId,
  EmailLabel,
  EmailThread
} from '../data/types'

export function getLabel(id: string): EmailLabel | undefined {
  return LABELS.find(label => label.id === id)
}

export function getFolder(id: string): EmailFolder | undefined {
  return FOLDERS.find(folder => folder.id === id)
}

export function getMailsForFolder(
  mails: readonly EmailThread[],
  folderId: string
): readonly EmailThread[] {
  if (folderId === 'starred') return mails.filter(mail => mail.isStarred)

  return mails.filter(mail => mail.folderId === folderId)
}

export function getUnreadCounts(
  mails: readonly EmailThread[]
): Readonly<Record<EmailFolderId, number>> {
  const counts = Object.fromEntries(
    FOLDERS.map(folder => [folder.id, 0])
  ) as Record<EmailFolderId, number>

  for (const mail of mails) {
    if (mail.isRead) continue
    counts[mail.folderId] += 1
    if (mail.isStarred) counts.starred += 1
  }

  return counts
}

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
