import React from 'react'

export interface User {
  id: string
  name: string
  avatar?: string
}

export interface HeaderActionsProps {
  users: User

  showSearch?: boolean
  showFavorites?: boolean
  showArchive?: boolean

  favoritesCount?: number
  archiveCount?: number

  onAvatarClick?: (user: User) => void
  onSearchClick?: () => void
  onBookMarksClick?: () => void
  onDiskClick?: () => void

  className?: string
}
