import type { ComponentType } from 'react'

export type EmailFolderId =
  | 'inbox'
  | 'starred'
  | 'sent'
  | 'drafts'
  | 'snoozed'
  | 'archive'
  | 'spam'
  | 'trash'

export type EmailLabelTone =
  | 'accent'
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'

export interface EmailFolder {
  id: EmailFolderId
  label: string
  icon: ComponentType<{ className?: string }>
}

export interface EmailLabel {
  id: string
  label: string
  tone: EmailLabelTone
}

export type EmailAttachment = {
  id: string
  name: string
  size: string
  kind: 'pdf' | 'image' | 'spreadsheet' | 'doc' | 'other'
}

export type EmailAddress = {
  name: string
  email: string
  avatar?: string
}

export type EmailMessage = {
  id: string
  from: EmailAddress
  to: readonly EmailAddress[]
  cc?: readonly EmailAddress[]
  /** Display-friendly timestamp (mock data, so no Date). */
  receivedAt: string
  body: readonly string[]
  attachments?: readonly EmailAttachment[]
}

export type EmailThread = {
  id: string
  folderId: EmailFolderId
  subject: string
  preview: string
  updatedAt: string
  isRead: boolean
  isStarred: boolean
  isImportant?: boolean
  labelIds: readonly string[]
  participants: readonly EmailAddress[]
  messages: readonly EmailMessage[]
}
