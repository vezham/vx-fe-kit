export type Owner = {
  avatar: string
  email: string
  name: string
}

export type Project = {
  startDate: Date
  dueDate: Date
  project: string
  tags: Tags[]
  id: number
  owner: Owner
  projectId: number
  status: Status
}

export interface CopyTextProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  textClassName?: string
  copyText?: string
  timeout?: number
  children: string
  variant?: 'default' | 'compact'
}

export type Status =
  | 'paid'
  | 'draft'
  | 'overdue'
  | 'sent'
  | 'onhold'
  | 'pending'
  | 'cancelled'

export type Tags =
  | 'Design'
  | 'Product'
  | 'Marketing'
  | 'Management'
  | 'Engineering'
  | 'Sales'
  | 'Support'
  | 'Other'
  | (string & {})
