import React from 'react'

export interface User {
  id: string
  name: string
  avatar?: string
}

export interface HeaderActionsProps {
  user: User

  showSearch?: boolean
  showFavorites?: boolean
  showArchive?: boolean

  favoritesCount?: number
  archiveCount?: number

  onAvatarClick?: (user: User) => void
  onSearchClick?: () => void
  onFavoritesClick?: () => void
  onArchiveClick?: () => void

  className?: string
}
