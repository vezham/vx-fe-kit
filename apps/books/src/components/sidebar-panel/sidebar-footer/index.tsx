import { Icon } from '@iconify/react'
import React from 'react'

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip
} from '@vezham/react/v2'

import { SidebarFooterProps } from './types'
import { sidebarFooterVariants } from './variant'

const UserPopoverCard = () => {
  return (
    <Card className="max-w-[250px] border-none bg-transparent" shadow="none">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="https://img.heroui.chat/image/avatar?w=200&h=200&u=7"
          />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small text-default-600 leading-none font-semibold">
              User
            </h4>
            <h5 className="text-small text-default-500 tracking-tight">
              Developer
            </h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className="text-small text-default-500 pl-px">
          Full-stack developer, loves building awesome apps
        </p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="text-default-600 text-small font-semibold">100</p>
          <p className="text-default-500 text-small">Projects</p>
        </div>
        <div className="flex gap-1">
          <p className="text-default-600 text-small font-semibold">500</p>
          <p className="text-default-500 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  )
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({
  isCompact,
  isDarkMode,
  isRightSidebar,
  isRtl,
  toggleTheme,
  toggleTextDirection,
  buttonTextColor
}) => {
  return (
    <div className={sidebarFooterVariants.container(isCompact)}>
      {!isCompact ? (
        <>
          <div className={sidebarFooterVariants.buttonGroup(isCompact)}>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onPress={toggleTheme}
              className={sidebarFooterVariants.iconButton(buttonTextColor)}>
              <Icon
                icon={isDarkMode ? 'lucide:sun' : 'lucide:moon'}
                width={20}
                className={buttonTextColor}
              />
            </Button>

            <Button
              isIconOnly
              variant="light"
              size="sm"
              onPress={toggleTextDirection}
              className={sidebarFooterVariants.directionButton(isDarkMode)}>
              <Icon
                icon={
                  isRtl ? 'lucide:arrow-right-left' : 'lucide:arrow-left-right'
                }
                width={20}
                className={sidebarFooterVariants.directionIcon(isDarkMode)}
              />
            </Button>
          </div>

          {/* Popover wrapping avatar + name */}
          <Popover showArrow placement="top">
            <PopoverTrigger>
              <div
                className={`${sidebarFooterVariants.avatarContainer} flex cursor-pointer items-center`}
                tabIndex={0}>
                <Avatar
                  isBordered
                  color="primary"
                  size="sm"
                  src="https://img.heroui.chat/image/avatar?w=200&h=200&u=7"
                />
                <div className="flex flex-col">
                  <p
                    className={sidebarFooterVariants.userInfoName(
                      buttonTextColor
                    )}>
                    User
                  </p>
                  <p className={sidebarFooterVariants.userInfoRole(isDarkMode)}>
                    Developer
                  </p>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-2">
              <UserPopoverCard />
            </PopoverContent>
          </Popover>
        </>
      ) : (
        <>
          {/* Compact mode buttons with tooltips */}
          <Tooltip content="Toggle theme" placement="right">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onPress={toggleTheme}
              className={sidebarFooterVariants.iconButton(buttonTextColor)}>
              <Icon
                icon={isDarkMode ? 'lucide:sun' : 'lucide:moon'}
                width={18}
                className={buttonTextColor}
              />
            </Button>
          </Tooltip>

          <Tooltip
            content={isRtl ? 'Switch to LTR' : 'Switch to RTL'}
            placement={isRightSidebar ? 'left' : 'right'}>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onPress={toggleTextDirection}
              className={sidebarFooterVariants.directionButton(isDarkMode)}>
              <Icon
                icon={
                  isRtl ? 'lucide:arrow-right-left' : 'lucide:arrow-left-right'
                }
                width={20}
                className={sidebarFooterVariants.directionIcon(isDarkMode)}
              />
            </Button>
          </Tooltip>

          <Tooltip content="Admin User" placement="right">
            <Avatar
              isBordered
              color="primary"
              size="sm"
              src="https://img.heroui.chat/image/avatar?w=200&h=200&u=7"
            />
          </Tooltip>
        </>
      )}
    </div>
  )
}

export default SidebarFooter
