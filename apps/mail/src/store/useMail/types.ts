export type EmailAddress = {
  name: string
  email: string
  avatar?: string
}

export type EmailFolderId =
  | 'inbox'
  | 'starred'
  | 'sent'
  | 'drafts'
  | 'snoozed'
  | 'archive'
  | 'spam'
  | 'trash'

export type EmailAttachment = {
  id: string
  name: string
  size: string
  kind: 'pdf' | 'image' | 'spreadsheet' | 'doc' | 'other'
}

export type EmailMessage = {
  id: string
  from: EmailAddress
  to: readonly EmailAddress[]
  cc?: readonly EmailAddress[]
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

export type RQEmail = {
  folderId?: string
}

export interface EmailResponse {
  threads: EmailThread[]
}

export type Mail = EmailThread

export type Mails = Mail[]

export type RQMailList = {
  folderId?: EmailFolderId
}

export type RQMailGet = {
  id: string
}

export type RQMailCreate = {
  body: string
  folderId?: EmailFolderId
  subject: string
  to: string
  cc?: string[]
  attachments?: EmailAttachment[]
}

export type RQMailDelete = {
  id: string
}

export type MailAddress = EmailAddress
export type MailMessage = EmailMessage
export type MailThread = EmailThread
