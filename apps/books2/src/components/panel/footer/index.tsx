import { Icon } from '@iconify/react'

import { Badge } from '@vezham/react/v2'
import {
  Avatar,
  Button,
  Dropdown,
  Separator,
  Surface,
  Tooltip
} from '@vezham/react/v3'

import { FooterActionsProps } from './types'

export default function Footer({
  user,
  showAI = false,
  showControlCenter = false,
  showNotifications = false,
  showUserInfo = true,
  notificationCount = 0,
  onAI,
  onControlCenterClick,
  onNotificationsClick,
  onUserClick,
  className
}: FooterActionsProps) {
  return (
    <>
      <Separator className="hidden md:block" />
      <Surface
        variant="transparent"
        data-vx="footer"
        className={`${className ?? ''}`}>
        <div className="hidden flex-row items-center gap-6 min-[500px]:flex md:flex-col">
          {showAI && (
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <Icon
                  className="text-muted"
                  icon="solar:question-circle-linear"
                  width={24}
                  onClick={onAI}
                />
              </Tooltip.Trigger>
              <Tooltip.Content placement="right">Help</Tooltip.Content>
            </Tooltip>
          )}

          {showControlCenter && (
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <Icon
                  className="text-muted"
                  icon="solar:settings-linear"
                  width={24}
                  onClick={onControlCenterClick}
                />
              </Tooltip.Trigger>
              <Tooltip.Content placement="right">
                Control Center
              </Tooltip.Content>
            </Tooltip>
          )}

          {showNotifications && (
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <Badge
                  content={notificationCount}
                  isInvisible={notificationCount === 0}
                  color="danger">
                  <Icon
                    className="text-muted"
                    icon="solar:bell-linear"
                    width={24}
                    onClick={onNotificationsClick}
                  />
                </Badge>
              </Tooltip.Trigger>
              <Tooltip.Content placement="right">Notifications</Tooltip.Content>
            </Tooltip>
          )}

          {showUserInfo && (
            <Dropdown placement="right-end">
              <Dropdown.Trigger>
                <Button
                  isIconOnly
                  variant="ghost"
                  className="h-12 w-12 transition hover:scale-110">
                  <Badge
                    isInvisible={!user?.isOnline}
                    content=""
                    placement="bottom-right"
                    classNames={{
                      badge:
                        'bg-success w-3 h-3 min-w-0 p-0 border-2 border-background'
                    }}>
                    <Avatar size="sm">
                      <Avatar.Image src={user?.avatar} alt={user?.name} />
                      <Avatar.Fallback>
                        {user?.name?.[0]?.toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar>
                  </Badge>
                </Button>
              </Dropdown.Trigger>

              <Dropdown.Popover>
                <Dropdown.Menu aria-label="User Menu">
                  <Dropdown.Item key="profile">
                    <Icon icon="solar:user-linear" width={20} />
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="settings"
                    onPress={() => onUserClick?.(user)}>
                    <Icon icon="solar:settings-linear" width={20} />
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Item key="logout">
                    <Icon icon="solar:logout-2-linear" width={20} />
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}
        </div>
      </Surface>
    </>
  )
}
