export type salesUserInfo = {
  avatar: string
  email: string
  name: string
}

export type salesUserProps = {
  id: number
  userInfo: salesUserInfo
  role: string
  status: StatusOptions
  lastLogin: Date
}

export type salesStats = {
  type: 'sales'
  id: number
  title: string
  totalInvoiced: number
  paid: number
  outstanding: number
  totalInvoices: number
}

export const statusOptions = [
  { name: 'Active', uid: 'active' },
  { name: 'Inactive', uid: 'inactive' },
  { name: 'Pending', uid: 'pending' },
  { name: 'Vacation', uid: 'vacation' }
] as const

export type StatusOptions = (typeof statusOptions)[number]['name']

export type RQSalesUsers = object

// stats

export interface RQGetSalesStats extends RQSalesUsers {
  id: number
}
export type RQListSalesStats = RQSalesUsers

// users
export interface RQGetUser extends RQSalesUsers {
  id: number
}

export type RQListUsers = RQSalesUsers
