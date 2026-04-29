import { Icon } from '@iconify/react'
import { useHotkey } from '@tanstack/react-hotkeys'
import { useCallback, useState } from 'react'

import { Badge } from '@vezham/react/v2'
import {
  Alert,
  Avatar,
  Button,
  CloseButton,
  Popover,
  Separator,
  Surface,
  Tooltip
} from '@vezham/react/v3'

import { HeaderActionsProps } from './types'

export default function Header({
  users,
  showSearch = false,
  showBookamarks = false,
  showDisk = false,
  favoritesCount = 0,
  archiveCount = 0,
  onAvatarClick,
  onSearchClick,
  onBookMarksClick,
  onDiskClick,
  className,
  hideSeparator = false
}: HeaderActionsProps) {
  const [submenu, setSubmenu] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const [showAlert, setShowAlert] = useState(false)

  const handleSearch = useCallback(() => {
    onSearchClick?.()
    setShowAlert(true)

    setTimeout(() => setShowAlert(false), 2000)
  }, [onSearchClick])

  useHotkey('Control+K', () => {
    handleSearch()
  })

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

          <Popover.Content className="rounded-xl p-2" placement="bottom">
            <Button
              variant="ghost"
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
            <Tooltip.Trigger asChild>
              <span>
                <Icon
                  className="text-muted cursor-pointer"
                  icon="solar:magnifer-linear"
                  width={24}
                  onClick={handleSearch}
                />
              </span>
            </Tooltip.Trigger>

            <Tooltip.Content placement="right">
              Search (Ctrl + K)
            </Tooltip.Content>
          </Tooltip>
        )}

        {showAlert && (
          <div className="fixed top-4 right-4 z-[9999] w-[320px]">
            <Alert status="success">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Search triggered</Alert.Title>
              </Alert.Content>
              <CloseButton onClick={() => setShowAlert(false)} />
            </Alert>
          </div>
        )}

        {showBookamarks && (
          <Tooltip delay={0}>
            <Tooltip.Trigger>
              <Badge
                content={favoritesCount}
                isInvisible={favoritesCount === 0}
                color="danger">
                <Icon
                  className="text-muted cursor-pointer"
                  icon="solar:star-linear"
                  width={24}
                  onClick={onBookMarksClick}
                />
              </Badge>
            </Tooltip.Trigger>
            <Tooltip.Content placement="right">Bookmarks</Tooltip.Content>
          </Tooltip>
        )}

        {showDisk && (
          <Tooltip delay={0}>
            <Tooltip.Trigger>
              <Badge
                content={archiveCount}
                isInvisible={archiveCount === 0}
                color="primary">
                <Icon
                  className="text-muted cursor-pointer"
                  icon="solar:archive-linear"
                  width={24}
                  onClick={onDiskClick}
                />
              </Badge>
            </Tooltip.Trigger>
            <Tooltip.Content placement="right">Disk</Tooltip.Content>
          </Tooltip>
        )}
      </Surface>

      {!hideSeparator && <Separator className="hidden md:block" />}
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
