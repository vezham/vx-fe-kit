export type TeamProps = {
  className?: string

  isDarkMode?: boolean
}

export interface Member {
  id: number
  name: string
  email: string
  role: string
  status: string
  lastLogin: string
  initials: string
  statusColor: 'success' | 'danger' | 'secondary'
}

export interface Permission {
  label: string
  type: 'success' | 'danger'
}

export interface Role {
  name: string
  permissions: Permission[]
}

export interface IconMap {
  success: string
  danger: string
}

export interface ColorMap {
  success: string
  danger: string
}
