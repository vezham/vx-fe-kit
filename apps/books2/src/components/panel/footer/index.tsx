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
  showCTA = false,
  showControlCenter = false,
  showNotifications = false,
  showUserInfo = true,
  notificationCount = 0,
  onCTA,
  onControlCenterClick,
  onNotificationsClick,
  onUserClick,
  onProfileClick,
  onLogout,
  className
}: FooterActionsProps) {
  return (
    <>
      <Separator className="hidden md:block" />

      <Surface
        variant="transparent"
        data-vx="footer"
        className={`${className ?? ''}`}>
        <div className="hidden flex-row items-center gap-2 min-[500px]:flex md:flex-col">
          {showCTA && (
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <div>
                  <Button
                    isIconOnly
                    variant="ghost"
                    className="h-12 w-12 transition hover:scale-110"
                    onPress={onCTA}>
                    <Icon icon="solar:question-circle-linear" width={24} />
                  </Button>
                </div>
              </Tooltip.Trigger>

              <Tooltip.Content placement="right">Help</Tooltip.Content>
            </Tooltip>
          )}

          {showControlCenter && (
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <div>
                  <Button
                    isIconOnly
                    variant="ghost"
                    className="h-12 w-12 transition hover:scale-110"
                    onPress={onControlCenterClick}>
                    <Icon icon="solar:settings-linear" width={24} />
                  </Button>
                </div>
              </Tooltip.Trigger>

              <Tooltip.Content placement="right">
                Control Center
              </Tooltip.Content>
            </Tooltip>
          )}

          {showNotifications && (
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <div>
                  <Badge
                    content={notificationCount}
                    isInvisible={notificationCount === 0}
                    color="danger">
                    <Button
                      isIconOnly
                      variant="ghost"
                      className="h-12 w-12 transition hover:scale-110"
                      onPress={onNotificationsClick}>
                      <Icon icon="solar:bell-linear" width={24} />
                    </Button>
                  </Badge>
                </div>
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
                  <Dropdown.Item
                    key="home"
                    startContent={<Icon icon="solar:home-linear" width={20} />}>
                    Back to Home
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="profile"
                    startContent={<Icon icon="solar:user-linear" width={20} />}
                    onPress={onProfileClick}>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="settings"
                    startContent={
                      <Icon icon="solar:settings-linear" width={20} />
                    }
                    onPress={() => onUserClick?.(user)}>
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="logout"
                    color="danger"
                    startContent={
                      <Icon icon="solar:logout-2-linear" width={20} />
                    }
                    onPress={onLogout}>
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
