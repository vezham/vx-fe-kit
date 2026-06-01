import { Icon } from '@iconify/react'
import { useCallback, useState } from 'react'

import {
  Avatar,
  Button,
  Popover,
  Separator,
  Surface,
  Tooltip
} from '@vezham/react-v3'

import { useCommand } from '../../command'
import { ShortcutKey } from '../../shortcut-key'
import { HeaderActionsProps } from './types'

export default function Header({
  users,
  showSearch = false,
  onAvatarClick,
  onSearchClick,
  extraActions,
  className,
  hideSeparator = false
}: HeaderActionsProps) {
  const [submenu, setSubmenu] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const { openCommand } = useCommand()

  const handleSearch = useCallback(() => {
    onSearchClick?.()
    openCommand()
  }, [onSearchClick, openCommand])

  const handlePopoverSearch = useCallback(() => {
    handleSearch()
    setOpen(false)
  }, [handleSearch])

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
            <MenuItem
              ariaLabel="Open command palette"
              icon="solar:magnifer-linear"
              shortcut="⌘ K"
              onClick={handlePopoverSearch}
            />
            <Separator className="my-2" />
            <Popover isOpen={submenu === 'file'}>
              <Popover.Trigger
                className="w-full"
                onMouseOver={() => setSubmenu('file')}
                onMouseLeave={() => setSubmenu(null)}>
                <div>
                  <MenuItem label="File" hasSub />
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
            <Tooltip.Trigger>
              <span
                aria-label="Open command palette"
                className="inline-flex"
                role="button"
                tabIndex={0}
                onClick={handleSearch}
                onKeyDown={event => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    handleSearch()
                  }
                }}>
                <Icon
                  className="text-muted cursor-pointer"
                  icon="solar:magnifer-linear"
                  width={24}
                />
              </span>
            </Tooltip.Trigger>

            <Tooltip.Content placement="right">
              Search (Ctrl/⌘ K)
            </Tooltip.Content>
          </Tooltip>
        )}
        {extraActions}
      </Surface>

      {!hideSeparator && <Separator className="hidden md:block" />}
    </>
  )
}

interface MenuItemProps {
  ariaLabel?: string
  icon?: string
  label?: string
  shortcut?: string
  hasSub?: boolean
  onClick?: () => void
}

function MenuItem({
  ariaLabel,
  icon,
  label,
  shortcut,
  hasSub,
  onClick
}: MenuItemProps) {
  return (
    <div
      aria-label={ariaLabel ?? label}
      className="hover:bg-background flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm"
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={event => {
        if (!onClick || (event.key !== 'Enter' && event.key !== ' ')) {
          return
        }

        event.preventDefault()
        onClick()
      }}>
      <div className="flex items-center gap-2">
        {icon && (
          <Icon icon={icon} width={18} className="text-muted-foreground" />
        )}
        <span>{label}</span>
      </div>
      <div className="text-muted-foreground flex items-center gap-2">
        {shortcut && <ShortcutKey shortcut={shortcut} />}
        {hasSub && <Icon icon="solar:alt-arrow-right-linear" width={16} />}
      </div>
    </div>
  )
}
