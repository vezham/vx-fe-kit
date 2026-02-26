import { Icon } from '@iconify/react'

import { Badge } from '@vezham/react/v2'
import { Avatar, Button, Separator, Surface } from '@vezham/react/v3'

import { HeaderActionsProps } from './types'

export default function Header({
  user,
  showSearch = false,
  showFavorites = false,
  showArchive = false,
  favoritesCount = 0,
  archiveCount = 0,
  onAvatarClick,
  onSearchClick,
  onFavoritesClick,
  onArchiveClick,
  className
}: HeaderActionsProps) {
  return (
    <>
      <Surface
        variant="transparent"
        className={`flex flex-row items-center gap-2 md:flex-col ${className ?? ''}`}
        data-vx="header">
        <Button
          isIconOnly
          variant="ghost"
          size="sm"
          onPress={() => onAvatarClick?.(user)}
          className="transition-transform duration-300 hover:scale-110">
          <Avatar size="sm">
            {user.avatar && (
              <Avatar.Image src={user.avatar} alt={user.name} width={24} />
            )}
            <Avatar.Fallback>{user.name?.[0]?.toUpperCase()}</Avatar.Fallback>
          </Avatar>
        </Button>

        {showSearch && (
          <Button
            isIconOnly
            variant="ghost"
            onPress={onSearchClick}
            className="transition-all duration-300 hover:scale-110">
            <Icon
              className="text-muted-500"
              icon="solar:magnifer-linear"
              width={24}
            />
          </Button>
        )}

        {showFavorites && (
          <Badge
            content={favoritesCount}
            isInvisible={favoritesCount === 0}
            color="danger">
            <Button
              isIconOnly
              variant="ghost"
              onPress={onFavoritesClick}
              className="transition-all duration-300 hover:scale-110">
              <Icon icon="solar:star-linear" width={24} />
            </Button>
          </Badge>
        )}

        {showArchive && (
          <Badge
            content={archiveCount}
            isInvisible={archiveCount === 0}
            color="primary">
            <Button
              isIconOnly
              variant="ghost"
              onPress={onArchiveClick}
              className="transition-all duration-300 hover:scale-110">
              <Icon icon="solar:archive-linear" width={24} />
            </Button>
          </Badge>
        )}
      </Surface>
      <Separator className="hidden md:block" />
    </>
  )
}
