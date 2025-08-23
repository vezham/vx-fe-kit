import { statusOptions } from './data'

// type IconType = 'success' | 'danger'
// type ColorType = 'success' | 'danger'

// interface Permission {
//   label: string
//   type: IconType & ColorType // The type property must be either 'success' or 'danger'
// }

export interface TeamSettingCardProps {
  className?: string
  endContent?: (open: () => void) => React.ReactNode
}

export type UserInfo = {
  avatar: string
  email: string
  name: string
}

export type Users = {
  [x: string]: any
  id: number
  userInfo: UserInfo
  role: string
  status: StatusOptions
  lastLogin: Date
}

export type StatusOptions = (typeof statusOptions)[number]['name']
