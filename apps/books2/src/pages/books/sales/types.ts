export type Vendor = {
  avatar: string
  email: string
  name: string
}

export interface CopyTextProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  textClassName?: string
  copyText?: string
  timeout?: number
  children: string
  variant?: 'default' | 'compact'
}

export type Sales = {
  amount: number | string
  tags: Tags[]
  product: string
  date: Date
  dueDate: Date
  id: number
  vendor: Vendor
  status: Status
  orderId: number
  externalOrderID: string
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
