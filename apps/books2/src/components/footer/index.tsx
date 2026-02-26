import { Icon } from '@iconify/react'
import React from 'react'

import { Avatar, Button, Card, Popover, Tooltip } from '@vezham/react/v3'

import { FooterProps } from './types'
import { FooterVariants } from './variant'

const UserPopoverCard = () => {
  return (
    <Card className="max-w-[250px] border-none bg-transparent">
      <Card.Header className="justify-between">
        <div className="flex gap-3">
          <Avatar>
            <Avatar.Image
              alt="Blue"
              src="https://img.heroui.chat/image/avatar?w=200&h=200&u=7"
            />
          </Avatar>

          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small text-default-600 leading-none font-semibold">
              User
            </h4>
            <h5 className="text-small text-default-500 tracking-tight">
              Developer
            </h5>
          </div>
        </div>
      </Card.Header>
      <Card.Description className="px-3 py-0">
        <p className="text-small text-default-500 pl-px">
          Full-stack developer, loves building awesome apps 🎉
        </p>
      </Card.Description>
      <Card.Footer className="gap-3">
        <div className="flex gap-1">
          <p className="text-default-600 text-small font-semibold">100</p>
          <p className="text-default-500 text-small">Projects</p>
        </div>
        <div className="flex gap-1">
          <p className="text-default-600 text-small font-semibold">500</p>
          <p className="text-default-500 text-small">Followers</p>
        </div>
      </Card.Footer>
    </Card>
  )
}

const Footer: React.FC<FooterProps> = ({
  isCompact,
  isDarkMode,
  isRightSidebar,
  isRtl,
  toggleTheme,
  toggleTextDirection,
  buttonTextColor
}) => {
  return (
    <div className={FooterVariants.container(isCompact)}>
      {!isCompact ? (
        <>
          <div className={FooterVariants.buttonGroup(isCompact)}>
            <Button
              isIconOnly
              variant="ghost"
              size="sm"
              onPress={toggleTheme}
              className={FooterVariants.iconButton(buttonTextColor)}>
              <Icon
                icon={isDarkMode ? 'lucide:sun' : 'lucide:moon'}
                width={20}
                className={buttonTextColor}
              />
            </Button>

            <Button
              isIconOnly
              variant="ghost"
              size="sm"
              onPress={toggleTextDirection}
              className={FooterVariants.directionButton(isDarkMode)}>
              <Icon
                icon={
                  isRtl ? 'lucide:arrow-right-left' : 'lucide:arrow-left-right'
                }
                width={20}
                className={FooterVariants.directionIcon(isDarkMode)}
              />
            </Button>
          </div>

          {/* Popover wrapping avatar + name */}
          <Popover>
            <Popover.Trigger>
              <div
                className={`${FooterVariants.avatarContainer} flex cursor-pointer items-center`}
                tabIndex={0}>
                <Avatar>
                  <Avatar.Image
                    alt="Error"
                    src="https://img.heroui.chat/image/avatar?w=200&h=200&u=7"
                  />
                </Avatar>
                <div className="flex flex-col">
                  <p className={FooterVariants.userInfoName(buttonTextColor)}>
                    User
                  </p>
                  <p className={FooterVariants.userInfoRole(isDarkMode)}>
                    Developer
                  </p>
                </div>
              </div>
            </Popover.Trigger>
            <Popover.Content
              placement="top"
              className="relative z-[9999] overflow-visible p-1">
              <Popover.Dialog>
                <Popover.Arrow />
              </Popover.Dialog>
              <UserPopoverCard />
            </Popover.Content>
          </Popover>
        </>
      ) : (
        <>
          {/* Compact mode buttons with tooltips */}
          <Tooltip>
            <Button
              isIconOnly
              variant="ghost"
              size="sm"
              onPress={toggleTheme}
              className={FooterVariants.iconButton(buttonTextColor)}>
              <Icon
                icon={isDarkMode ? 'lucide:sun' : 'lucide:moon'}
                width={18}
                className={buttonTextColor}
              />
            </Button>
            <Tooltip.Content showArrow placement="right">
              <p>Toggle Theme</p>
            </Tooltip.Content>
          </Tooltip>

          <Tooltip>
            <Tooltip.Trigger>
              <Button
                isIconOnly
                variant="ghost"
                size="sm"
                onPress={toggleTextDirection}
                className={FooterVariants.directionButton(isDarkMode)}>
                <Icon
                  icon={
                    isRtl
                      ? 'lucide:arrow-right-left'
                      : 'lucide:arrow-left-right'
                  }
                  width={20}
                  className={FooterVariants.directionIcon(isDarkMode)}
                />
              </Button>
            </Tooltip.Trigger>

            <Tooltip.Content placement={isRightSidebar ? 'left' : 'right'}>
              {isRtl ? 'Switch to LTR' : 'Switch to RTL'}
            </Tooltip.Content>
          </Tooltip>

          <Tooltip>
            <Avatar size="sm">
              <Avatar.Image src="https://img.heroui.chat/image/avatar?w=200&h=200&u=7"></Avatar.Image>
            </Avatar>
            <Tooltip.Content showArrow placement="right">
              <p>Admin User</p>
            </Tooltip.Content>
          </Tooltip>
        </>
      )}
    </div>
  )
}

export default Footer
