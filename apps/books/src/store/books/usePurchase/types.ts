export type Vendor = {
  avatar: string
  email: string
  name: string
}

export type Purchase = {
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

export type purchaseStats = {
  type: string
  id: number
  title: string
  totalBilled: number
  paid: number
  outstanding: number
  totalBills: number
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

export type Status =
  | 'paid'
  | 'draft'
  | 'overdue'
  | 'sent'
  | 'onhold'
  | 'pending'
  | 'cancelled'

export type RQPurchase = object

// stats
export type RQStats = RQPurchase

//users

export type RQListUsers = RQPurchase

export interface RQGetUsers extends RQPurchase {
  id: number
}
