import { Icon } from '@iconify/react'

import { Badge } from '@vezham/react/v2'
import {
  Avatar,
  Button,
  Popover,
  Separator,
  Surface,
  Tooltip
} from '@vezham/react/v3'

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
        {/* Avatar Popover */}
        <Popover placement="right">
          <Popover.Trigger>
            <Button
              isIconOnly
              variant="ghost"
              className="h-12 w-12 transition-transform duration-300 hover:scale-110"
              onPress={() => onAvatarClick?.(user)}>
              <Avatar size="sm">
                {user.avatar && (
                  <Avatar.Image src={user.avatar} alt={user.name} width={24} />
                )}
                <Avatar.Fallback>
                  {user.name?.[0]?.toUpperCase()}
                </Avatar.Fallback>
              </Avatar>
            </Button>
          </Popover.Trigger>

          <Popover.Content className="w-64 p-4">
            <div className="flex items-center gap-3">
              <Avatar size="md">
                {user.avatar && (
                  <Avatar.Image src={user.avatar} alt={user.name} />
                )}
                <Avatar.Fallback>
                  {user.name?.[0]?.toUpperCase()}
                </Avatar.Fallback>
              </Avatar>

              <div className="flex flex-col">
                <span className="text-sm font-semibold">{user.name}</span>
                {user.email && (
                  <span className="text-muted-500 text-xs">{user.email}</span>
                )}
              </div>
            </div>

            <Separator className="my-3" />

            <div className="flex w-full flex-col gap-2">
              <Button
                fullWidth
                size="sm"
                variant="ghost"
                className="cursor-pointer">
                Profile
              </Button>
              <Button
                fullWidth
                size="sm"
                variant="ghost"
                className="cursor-pointer">
                Settings
              </Button>
              <Button
                fullWidth
                size="sm"
                variant="danger"
                className="cursor-pointer">
                Logout
              </Button>
            </div>
          </Popover.Content>
        </Popover>

        {/* Search */}
        {showSearch && (
          <Tooltip delay={0}>
            <Button
              isIconOnly
              variant="ghost"
              onPress={onSearchClick}
              className="h-12 w-12 transition-all duration-300 hover:scale-110">
              <Icon
                className="text-muted-500"
                icon="solar:magnifer-linear"
                width={24}
              />
            </Button>

            <Tooltip.Content placement="right">
              <p>Search</p>
            </Tooltip.Content>
          </Tooltip>
        )}

        {/* Favorites */}
        {showFavorites && (
          <Tooltip delay={0}>
            <Badge
              content={favoritesCount}
              isInvisible={favoritesCount === 0}
              color="danger">
              <Button
                isIconOnly
                variant="ghost"
                onPress={onFavoritesClick}
                className="h-12 w-12 transition-all duration-300 hover:scale-110">
                <Icon icon="solar:star-linear" width={24} />
              </Button>
            </Badge>

            <Tooltip.Content placement="right">
              <p>Favorites</p>
            </Tooltip.Content>
          </Tooltip>
        )}

        {/* Archive */}
        {showArchive && (
          <Tooltip delay={0}>
            <Badge
              content={archiveCount}
              isInvisible={archiveCount === 0}
              color="primary">
              <Button
                isIconOnly
                variant="ghost"
                onPress={onArchiveClick}
                className="h-12 w-12 transition-all duration-300 hover:scale-110">
                <Icon icon="solar:archive-linear" width={24} />
              </Button>
            </Badge>

            <Tooltip.Content placement="right">
              <p>Archived</p>
            </Tooltip.Content>
          </Tooltip>
        )}
      </Surface>

      <Separator className="hidden md:block" />
    </>
  )
}
