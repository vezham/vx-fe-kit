import { Icon } from '@iconify/react'

import { Badge } from '@vezham/react/v2'
import { Avatar, Button, Dropdown, Separator, Surface } from '@vezham/react/v3'

import { FooterActionsProps } from './types'

export default function Footer({
  user,
  showAI = false,
  showControlCenter = false,
  showNotifications = false,
  showUserInfo = true,
  notificationCount = 0,
  onAIClick,
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
        className={`flex items-end justify-center gap-3 ${className ?? ''}`}
        data-vx="footer">
        <div className="hidden flex-row items-center gap-3 min-[500px]:flex md:flex-col">
          {showAI && (
            <Button
              isIconOnly
              variant="ghost"
              onPress={onAIClick}
              className="transition-all duration-300 hover:scale-110">
              <Icon icon="solar:cpu-bolt-linear" width={24} />
            </Button>
          )}

          {showControlCenter && (
            <Button
              isIconOnly
              variant="ghost"
              onPress={onControlCenterClick}
              className="transition-all duration-300 hover:scale-110">
              <Icon icon="solar:settings-linear" width={24} />
            </Button>
          )}

          {showNotifications && (
            <Badge
              content={notificationCount}
              isInvisible={notificationCount === 0}
              color="danger">
              <Button
                isIconOnly
                variant="ghost"
                onPress={onNotificationsClick}
                className="transition-all duration-300 hover:scale-110">
                <Icon icon="solar:bell-linear" width={24} />
              </Button>
            </Badge>
          )}

          {showUserInfo && (
            <Button
              isIconOnly
              variant="ghost"
              onPress={() => onUserClick?.(user)}
              className="transition-transform duration-300 hover:scale-110">
              <Badge
                isInvisible={!user.isOnline}
                content=""
                placement="bottom-right"
                classNames={{
                  badge:
                    'bg-success w-3 h-3 min-w-0 p-0 border-2 border-background'
                }}>
                <Avatar size="sm">
                  <Avatar.Image src={user.avatar} alt={user.name} />
                  <Avatar.Fallback>
                    {user.name?.[0]?.toUpperCase()}
                  </Avatar.Fallback>
                </Avatar>
              </Badge>
            </Button>
          )}
        </div>

        {/* ===== Mobile < 500px ===== */}
        <div className="flex items-center gap-3 min-[500px]:hidden">
          <Dropdown placement="right-end">
            <Dropdown.Trigger>
              <Button
                isIconOnly
                variant="ghost"
                className="transition-all duration-300 hover:scale-110">
                <Icon icon="solar:menu-dots-linear" width={24} />
              </Button>
            </Dropdown.Trigger>

            <Dropdown.Popover>
              <Dropdown.Menu aria-label="More actions">
                {showAI && (
                  <Dropdown.Item
                    key="ai"
                    onPress={onAIClick}
                    startContent={
                      <Icon icon="solar:cpu-bolt-linear" width={20} />
                    }>
                    AI
                  </Dropdown.Item>
                )}

                {showControlCenter && (
                  <Dropdown.Item
                    key="control"
                    onPress={onControlCenterClick}
                    startContent={
                      <Icon icon="solar:settings-linear" width={20} />
                    }>
                    Control Center
                  </Dropdown.Item>
                )}

                {showNotifications && (
                  <Dropdown.Item
                    key="notifications"
                    onPress={onNotificationsClick}
                    startContent={<Icon icon="solar:bell-linear" width={20} />}
                    endContent={
                      notificationCount > 0 && (
                        <Badge
                          content={notificationCount}
                          color="danger"
                          size="sm"
                        />
                      )
                    }>
                    Notifications
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
          {/* ===== User (Always Visible) ===== */}
          {showUserInfo && (
            <Button
              isIconOnly
              variant="ghost"
              onPress={() => onUserClick?.(user)}
              className="transition-transform duration-300 hover:scale-110">
              <Badge
                isInvisible={!user.isOnline}
                content=""
                placement="bottom-right"
                classNames={{
                  badge:
                    'bg-success w-3 h-3 min-w-0 p-0 border-2 border-background'
                }}>
                <Avatar size="sm">
                  <Avatar.Image src={user.avatar} alt={user.name} />
                  <Avatar.Fallback>
                    {user.name?.[0]?.toUpperCase()}
                  </Avatar.Fallback>
                </Avatar>
              </Badge>
            </Button>
          )}
        </div>
      </Surface>
    </>
  )
}
