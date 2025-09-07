export type Vendor = {
  avatar: string
  email: string
  name: string
}

export type Sales = {
  id: number
  orderId: number
  externalOrderID: string
  vendor: Vendor
  product: string
  date: Date
  dueDate: Date
  amount: number | string
  tags: Tags[]
  status: Status
}

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

export type salesStats = {
  type: string
  id: number
  title: string
  totalInvoiced: number
  paid: number
  outstanding: number
  totalInvoices: number
}

export type Status =
  | 'paid'
  | 'draft'
  | 'overdue'
  | 'sent'
  | 'onhold'
  | 'pending'
  | 'cancelled'

export type Dates = 'all' | 'last7Days' | 'last30Days' | 'last60Days'

export type RQSales = object

// stats

export type RQStats = RQSales

// users

export type RQListUsers = RQSales

export interface RQGetUsers extends RQSales {
  id: number
}
