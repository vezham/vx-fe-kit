export type purchaseUserInfo = {
  avatar: string
  email: string
  name: string
}

export type purchaseUserProps = {
  id: number
  userInfo: purchaseUserInfo
  role: string
  status: StatusOptions
  lastLogin: Date
}

export type purchaseStats = {
  type: 'purchase'
  id: number
  title: string
  totalBilled: number
  paid: number
  outstanding: number
  totalBills: number
}

export const statusOptions = [
  { name: 'Active', uid: 'active' },
  { name: 'Inactive', uid: 'inactive' },
  { name: 'Pending', uid: 'pending' },
  { name: 'Vacation', uid: 'vacation' }
] as const

export type StatusOptions = (typeof statusOptions)[number]['name']

export type RQPurchaseUsers = object

export interface RQGetPurchaseStats extends RQPurchaseUsers {
  id: number
}

export type RQListPurchaseStats = RQPurchaseUsers

export interface RQGetUser extends RQPurchaseUsers {
  id: number
}

export type RQListUsers = RQPurchaseUsers
