import { Icon } from '@iconify/react'

import { Badge } from '@vezham/react/v2'
import { Avatar, Button, Dropdown, Separator, Surface } from '@vezham/react/v3'

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
  className
}: FooterActionsProps) {
  return (
    <>
      <Separator className="hidden md:block" />
      <Surface
        variant="transparent"
        className={`flex items-end justify-center gap-2 ${className ?? ''}`}
        data-vx="footer">
        <div className="hidden flex-row items-center min-[500px]:flex md:flex-col">
          {showCTA && (
            <Button
              isIconOnly
              variant="ghost"
              onPress={onCTA}
              className="h-12 w-12 transition-all duration-300 hover:scale-110">
              <Icon icon="solar:question-circle-linear" width={48} />
            </Button>
          )}

          {showControlCenter && (
            <Button
              isIconOnly
              variant="ghost"
              onPress={onControlCenterClick}
              className="h-12 w-12 transition-all duration-300 hover:scale-110">
              <Icon icon="solar:settings-linear" width={48} />
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
                className="h-12 w-12 transition-all duration-300 hover:scale-110">
                <Icon icon="solar:bell-linear" width={48} />
              </Button>
            </Badge>
          )}

          {showUserInfo && (
            <Button
              isIconOnly
              variant="ghost"
              onPress={() => onUserClick?.(user)}
              className="h-12 w-12 transition-transform duration-300 hover:scale-110">
              <Badge
                isInvisible={!user.isOnline}
                content=""
                placement="bottom-right"
                classNames={{
                  badge:
                    'bg-success w-3 h-3 min-w-0 p-0 border-2 border-background '
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

        <div className="flex items-center min-[500px]:hidden">
          <Dropdown placement="right-end">
            <Dropdown.Trigger>
              <Button
                isIconOnly
                size="md"
                variant="ghost"
                className="h-12 w-12 transition-all duration-300 hover:scale-110">
                <Icon icon="solar:menu-dots-linear" width={48} />
              </Button>
            </Dropdown.Trigger>

            <Dropdown.Popover>
              <Dropdown.Menu aria-label="More actions">
                {showControlCenter && (
                  <Dropdown.Item key="control" onPress={onControlCenterClick}>
                    <Icon icon="solar:settings-linear" width={48} />
                    Control Center
                  </Dropdown.Item>
                )}

                {showNotifications && (
                  <Dropdown.Item
                    key="notifications"
                    onPress={onNotificationsClick}
                    endContent={
                      notificationCount > 0 && (
                        <Badge
                          content={notificationCount}
                          color="danger"
                          size="sm"
                        />
                      )
                    }>
                    <Icon icon="solar:bell-linear" width={48} /> Notifications
                  </Dropdown.Item>
                )}

                {showCTA && (
                  <Dropdown.Item key="help" onPress={onCTA}>
                    <Icon icon="solar:question-circle-linear" width={48} /> Help
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
              className="h-12 w-12 transition-transform duration-300 hover:scale-110">
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
