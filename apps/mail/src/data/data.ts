import {
  Archive,
  FileText,
  House,
  PaperPlane,
  SquareExclamation,
  Star,
  Stopwatch,
  TrashBin,
  Tray
} from '@gravity-ui/icons'
import { ComponentType } from 'react'

import { EmailFolder, EmailFolderId, EmailLabel } from './types'

export const FOLDERS: readonly EmailFolder[] = [
  { icon: Tray, id: 'inbox', label: 'Inbox' },
  { icon: Star, id: 'starred', label: 'Starred' },
  { icon: PaperPlane, id: 'sent', label: 'Sent' },
  { icon: FileText, id: 'drafts', label: 'Drafts' },
  { icon: Stopwatch, id: 'snoozed', label: 'Snoozed' },
  { icon: Archive, id: 'archive', label: 'Archive' },
  { icon: SquareExclamation, id: 'spam', label: 'Spam' },
  { icon: TrashBin, id: 'trash', label: 'Trash' }
] as const

export const DEFAULT_FOLDER_ID: EmailFolderId = 'inbox'

export const HOME_ICON: ComponentType<{ className?: string }> = House

export const LABELS: readonly EmailLabel[] = [
  { id: 'work', label: 'Work', tone: 'accent' },
  { id: 'personal', label: 'Personal', tone: 'default' },
  { id: 'billing', label: 'Billing', tone: 'warning' },
  { id: 'travel', label: 'Travel', tone: 'success' },
  { id: 'urgent', label: 'Urgent', tone: 'danger' }
] as const
