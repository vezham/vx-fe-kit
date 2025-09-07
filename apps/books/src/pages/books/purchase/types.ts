export type Vendor = {
  avatar: string
  email: string
  name: string
}

export type Purchase = {
  date: Date
  dueDate: Date
  amount: number | string
  product: string
  tags: Tags[]
  id: number
  vendor: Vendor
  orderId: number
  externalOrderID: string
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
