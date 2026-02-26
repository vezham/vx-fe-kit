import { Icon } from '@iconify/react'
import React from 'react'

import { Avatar, Button, Card, Popover } from '@vezham/react/v3'

import { HeaderProps } from './types'
import { HeaderVariants, userPopoverCardVariants } from './variant'

const UserPopoverCard = () => {
  const [isFollowed, setIsFollowed] = React.useState(false)

  return (
    <Card className={userPopoverCardVariants.card()}>
      <Card.Header className="justify-between">
        <div className="flex gap-3">
          <Avatar size="sm">
            <Avatar.Image
              width={24}
              alt="avatar"
              src="https://i.pravatar.cc/150?u=a04258114e29026702d"
            />
          </Avatar>

          <div className="flex flex-col items-start justify-center">
            <h4 className={userPopoverCardVariants.name()}>Zoey Lang</h4>
            <h5 className={userPopoverCardVariants.username()}>@zoeylang</h5>
          </div>
        </div>

        <Button
          size="sm"
          variant={isFollowed ? 'outline' : 'primary'}
          onPress={() => setIsFollowed(!isFollowed)}>
          {isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
      </Card.Header>

      <Card.Description className="px-3 py-0">
        <p className={userPopoverCardVariants.bio()}>
          Full-stack developer, @hero_ui lover she/her
        </p>
      </Card.Description>

      <Card.Footer className="gap-3">
        <div className="flex gap-1">
          <p className={userPopoverCardVariants.statNumber()}>4</p>
          <p className={userPopoverCardVariants.statLabel()}>Following</p>
        </div>

        <div className="flex gap-1">
          <p className={userPopoverCardVariants.statNumber()}>97.1K</p>
          <p className={userPopoverCardVariants.statLabel()}>Followers</p>
        </div>
      </Card.Footer>
    </Card>
  )
}

interface SidebarHeaderExtendedProps extends HeaderProps {
  onSlackClick: () => void
  isPopoverOpen: boolean
  setPopoverOpen: (open: boolean) => void
}

const Header: React.FC<SidebarHeaderExtendedProps> = ({
  isCompact,
  buttonTextColor,
  onSlackClick,
  isPopoverOpen,
  setPopoverOpen
}) => {
  return (
    <div className={HeaderVariants.container(isCompact)}>
      {isCompact ? (
        <div
          onClick={onSlackClick}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              onSlackClick()
            }
          }}
          className={HeaderVariants.compactSlackButton()}>
          <Icon
            icon="logos:slack-icon"
            className={HeaderVariants.icon(buttonTextColor, isCompact)}
          />
          <Icon
            icon="lucide:chevron-down"
            className={HeaderVariants.compactChevron()}
          />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div
            onClick={onSlackClick}
            className={HeaderVariants.expandedSlackButton()}>
            <Icon
              icon="logos:slack-icon"
              className={HeaderVariants.icon(buttonTextColor, isCompact)}
            />
            <Icon
              icon="lucide:chevron-down"
              className={HeaderVariants.expandedChevron(isPopoverOpen)}
            />
          </div>

          {/* ✅ Controlled Popover */}
          <Popover isOpen={isPopoverOpen} onOpenChange={setPopoverOpen}>
            <Popover.Trigger>
              <div
                onClick={() => setPopoverOpen(!isPopoverOpen)}
                className="cursor-pointer">
                <Avatar>
                  <Avatar.Image
                    alt="avatar"
                    src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                  />
                </Avatar>
              </div>
            </Popover.Trigger>

            <Popover.Content
              placement="bottom"
              className="relative z-[9999] p-1">
              <Popover.Dialog>
                <Popover.Arrow />
              </Popover.Dialog>

              <UserPopoverCard />
            </Popover.Content>
          </Popover>
        </div>
      )}
    </div>
  )
}

export default Header
