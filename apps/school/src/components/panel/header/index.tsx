import { Icon } from '@iconify/react'
import { useState } from 'react'

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
  users,
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
  const [submenu, setSubmenu] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  return (
    <>
      <Surface
        variant="transparent"
        className={`flex flex-row items-center gap-3 md:flex-col md:gap-6 ${className ?? ''}`}
        data-vx="header">
        <Popover isOpen={open} onOpenChange={setOpen}>
          <Popover.Trigger>
            <Button
              variant="ghost"
              className="flex h-12 items-center gap-2 px-2 transition-transform duration-300"
              onPress={() => {
                setOpen(!open)
                onAvatarClick?.(users)
              }}>
              <Avatar className="h-6 w-6">
                {users.avatar && (
                  <Avatar.Image src={users.avatar} alt={users.name} />
                )}
                <Avatar.Fallback>
                  {users.name?.[0]?.toUpperCase()}
                </Avatar.Fallback>
              </Avatar>
              <Icon
                icon="solar:alt-arrow-down-linear"
                width={12}
                className="text-muted-foreground"
              />
            </Button>
          </Popover.Trigger>

          <Popover.Content className="p-2" placement="bottom">
            <Button
              className="hover:bg-background w-full rounded-md px-3 py-2 text-left text-sm"
              onClick={() => setOpen(false)}>
              {' '}
              Back to home
            </Button>
            <Separator className="my-2" />
            <MenuItem icon="solar:magnifer-linear" shortcut="⌘ K" />
            <Separator className="my-2" />
            <Popover open={submenu === 'file'}>
              <Popover.Trigger
                onMouseOver={() => setSubmenu('file')}
                onMouseLeave={() => setSubmenu(null)}>
                <div>
                  <MenuItem label="File" icon="solar:folder-linear" hasSub />
                </div>
              </Popover.Trigger>
              <Popover.Content
                placement="right top"
                className="ml-2 p-2"
                onMouseOver={() => setSubmenu('file')}
                onMouseLeave={() => setSubmenu(null)}>
                <MenuItem label="New" hasSub />
                <Separator className="my-2" />
                <MenuItem
                  icon="solar:gallery-linear"
                  label="Place image..."
                  shortcut="⇧ ⌘ K"
                />
                <Separator className="my-2" />
                <MenuItem label="Save local copy..." />
                <MenuItem label="Save to version history..." shortcut="⌥ ⌘ S" />
                <MenuItem label="Show version history" />
                <Separator className="my-2" />
                <MenuItem label="Export..." shortcut="⇧ ⌘ E" />
                <MenuItem label="Export frames to PDF..." />
                <Separator className="my-2" />
                <MenuItem label="Create branch..." />
              </Popover.Content>
            </Popover>
            <MenuItem label="Edit" hasSub />
            <MenuItem label="View" hasSub />
          </Popover.Content>
        </Popover>

        {showSearch && (
          <Tooltip delay={0}>
            <Icon
              className="text-muted"
              icon="solar:magnifer-linear"
              width={24}
              onClick={onSearchClick}
            />
            <Tooltip.Content placement="right">Search</Tooltip.Content>
          </Tooltip>
        )}

        {showFavorites && (
          <Tooltip delay={0}>
            <Badge
              content={favoritesCount}
              isInvisible={favoritesCount === 0}
              color="danger">
              <Icon
                className="text-muted"
                icon="solar:star-linear"
                width={24}
                onClick={onFavoritesClick}
              />
            </Badge>
            <Tooltip.Content placement="right">Favorites</Tooltip.Content>
          </Tooltip>
        )}

        {showArchive && (
          <Tooltip delay={0}>
            <Badge
              content={archiveCount}
              isInvisible={archiveCount === 0}
              color="primary">
              <Icon
                className="text-muted"
                icon="solar:archive-linear"
                width={24}
                onClick={onArchiveClick}
              />
            </Badge>
            <Tooltip.Content placement="right">Archived</Tooltip.Content>
          </Tooltip>
        )}
      </Surface>

      <Separator className="hidden md:block" />
    </>
  )
}

function MenuItem({ icon, label, shortcut, hasSub }: any) {
  return (
    <div className="hover:bg-background flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm">
      <div className="flex items-center gap-2">
        {icon && (
          <Icon icon={icon} width={18} className="text-muted-foreground" />
        )}
        <span>{label}</span>
      </div>
      <div className="text-muted-foreground flex items-center gap-2">
        {shortcut && <span className="text-xs">{shortcut}</span>}
        {hasSub && <Icon icon="solar:alt-arrow-right-linear" width={16} />}
      </div>
    </div>
  )
}
