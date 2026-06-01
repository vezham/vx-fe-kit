import { ReactNode } from 'react'

export interface User {
  id: string
  name: string
  avatar?: string
}

export interface HeaderActionsProps {
  users: User

  showSearch?: boolean
  showBookamarks?: boolean
  showDisk?: boolean

  favoritesCount?: number
  archiveCount?: number

  onAvatarClick?: (user: User) => void
  onSearchClick?: () => void
  onBookMarksClick?: () => void
  onDiskClick?: () => void

  className?: string
  hideSeparator?: boolean
  extraActions?: ReactNode
}
