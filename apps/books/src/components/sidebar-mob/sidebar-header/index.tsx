import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'

import { SidebarHeaderProps } from './types'
import { sidebarHeaderVariants, userPopoverCardVariants } from './variant'

const UserPopoverCard = () => {
  const [isFollowed, setIsFollowed] = React.useState(false)

  return (
    <Card className={userPopoverCardVariants.card()}>
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          />
          <div className="flex flex-col items-start justify-center">
            <h4 className={userPopoverCardVariants.name()}>Zoey Lang</h4>
            <h5 className={userPopoverCardVariants.username()}>@zoeylang</h5>
          </div>
        </div>
        <Button
          className={
            isFollowed
              ? 'text-foreground border-default-200 bg-transparent'
              : ''
          }
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? 'bordered' : 'solid'}
          onPress={() => setIsFollowed(!isFollowed)}>
          {isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className={userPopoverCardVariants.bio()}>
          Full-stack developer, @hero_ui lover she/her
        </p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className={userPopoverCardVariants.statNumber()}>4</p>
          <p className={userPopoverCardVariants.statLabel()}>Following</p>
        </div>
        <div className="flex gap-1">
          <p className={userPopoverCardVariants.statNumber()}>97.1K</p>
          <p className={userPopoverCardVariants.statLabel()}>Followers</p>
        </div>
      </CardFooter>
    </Card>
  )
}

interface SidebarHeaderExtendedProps extends SidebarHeaderProps {
  onSlackClick: () => void
  isPopoverOpen: boolean
  setPopoverOpen: (open: boolean) => void
}

const SidebarMobHeader: React.FC<SidebarHeaderExtendedProps> = ({
  isCompact,
  isRightSidebar,
  toggleVisibility,
  buttonTextColor,
  onSlackClick,
  isPopoverOpen,
  setPopoverOpen
}) => {
  return (
    <div className={sidebarHeaderVariants.container(isCompact)}>
      {isCompact ? (
        <div
          onClick={() => {
            onSlackClick()
            setPopoverOpen(false)
          }}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              onSlackClick()
              setPopoverOpen(false)
            }
          }}
          className={sidebarHeaderVariants.compactSlackButton()}>
          <Icon
            icon="logos:slack-icon"
            className={sidebarHeaderVariants.icon(buttonTextColor, isCompact)}
          />
          <Icon
            icon="lucide:chevron-down"
            className={sidebarHeaderVariants.compactChevron()}
          />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div
            onClick={onSlackClick}
            className={sidebarHeaderVariants.expandedSlackButton()}>
            <Icon
              icon="logos:slack-icon"
              className={sidebarHeaderVariants.icon(buttonTextColor, isCompact)}
            />
            <Icon
              icon="lucide:chevron-down"
              className={sidebarHeaderVariants.expandedChevron(isPopoverOpen)}
            />
          </div>

          {/* Popover now triggered by Avatar */}
          <Popover
            showArrow
            placement="bottom"
            open={isPopoverOpen}
            onOpenChange={setPopoverOpen}>
            <PopoverTrigger>
              <Avatar
                isBordered
                radius="full"
                size="md"
                className="cursor-pointer"
                src="https://i.pravatar.cc/150?u=a04258114e29026702d"
              />
            </PopoverTrigger>
            <PopoverContent className="relative z-[9999] overflow-visible p-1">
              <UserPopoverCard />
            </PopoverContent>
          </Popover>
        </div>
      )}

      {/* <Button
        isIconOnly
        variant="light"
        size="sm"
        onPress={toggleVisibility}
        className={sidebarHeaderVariants.button(buttonTextColor)}
      >
        <Icon
          icon={
            isCompact
              ? isRightSidebar
                ? "lucide:chevron-left"
                : "lucide:chevron-right"
              : isRightSidebar
              ? "lucide:chevron-right"
              : "lucide:chevron-left"
          }
          className={sidebarHeaderVariants.chevronIcon(
            buttonTextColor,
            isCompact,
            isRightSidebar
          )}
        />
      </Button> */}
    </div>
  )
}

export default SidebarMobHeader
