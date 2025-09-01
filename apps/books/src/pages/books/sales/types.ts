import { statusOptions } from './data'

export type UserInfo = {
  avatar: string
  email: string
  name: string
}

export type Users = {
  id: number
  userInfo: UserInfo
  role: string
  status: StatusOptions
  lastLogin: Date
}

export type StatusOptions = (typeof statusOptions)[number]['name']
