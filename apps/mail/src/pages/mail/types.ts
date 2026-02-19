export interface Email {
  id: string
  sender: string
  subject: string
  preview?: string
  date: string
  formattedDate: string
  labels?: Array<{
    name: string
    color: 'primary' | 'success' | 'warning' | 'danger' | 'default'
  }>
  hasAttachment?: boolean
  isImportant?: boolean
  isUnread?: boolean
  category?: string
}

export interface EmailListSectionProps {
  title: string
  emails: Email[]
  onEmailClick: (email: Email) => void
  selectedEmails: Set<string>
  onEmailSelect: (emailId: string, isSelected: boolean) => void
}

export interface EmailDrawerProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  email: Email | null
}

export type FilterOption = 'all' | 'read' | 'unread' | 'none'

export interface EmailListProps {
  emails: {
    lastWeek: Email[]
    lastMonth: Email[]
    january: Email[]
    december: Email[]
    november: Email[]
  }
  onEmailClick: (email: Email) => void
}
