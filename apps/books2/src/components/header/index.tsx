// import { Icon } from '@iconify/react'
// import React from 'react'

// import { Avatar, Button, Card, Popover } from '@vezham/react/v3'

// import { HeaderProps } from './types'
// import { HeaderVariants, userPopoverCardVariants } from './variant'

// const UserPopoverCard = () => {
//   const [isFollowed, setIsFollowed] = React.useState(false)

//   return (
//     <Card className={userPopoverCardVariants.card()}>
//       <Card.Header className="justify-between">
//         <div className="flex gap-3">
//           <Avatar size="sm">
//             <Avatar.Image
//               width={24}
//               alt="avatar"
//               src="https://i.pravatar.cc/150?u=a04258114e29026702d"
//             />
//           </Avatar>

//           <div className="flex flex-col items-start justify-center">
//             <h4 className={userPopoverCardVariants.name()}>Zoey Lang</h4>
//             <h5 className={userPopoverCardVariants.username()}>@zoeylang</h5>
//           </div>
//         </div>

//         <Button
//           size="sm"
//           variant={isFollowed ? 'outline' : 'primary'}
//           onPress={() => setIsFollowed(!isFollowed)}>
//           {isFollowed ? 'Unfollow' : 'Follow'}
//         </Button>
//       </Card.Header>

//       <Card.Description className="px-3 py-0">
//         <p className={userPopoverCardVariants.bio()}>
//           Full-stack developer, @hero_ui lover she/her
//         </p>
//       </Card.Description>

//       <Card.Footer className="gap-3">
//         <div className="flex gap-1">
//           <p className={userPopoverCardVariants.statNumber()}>4</p>
//           <p className={userPopoverCardVariants.statLabel()}>Following</p>
//         </div>

//         <div className="flex gap-1">
//           <p className={userPopoverCardVariants.statNumber()}>97.1K</p>
//           <p className={userPopoverCardVariants.statLabel()}>Followers</p>
//         </div>
//       </Card.Footer>
//     </Card>
//   )
// }

// interface SidebarHeaderExtendedProps extends HeaderProps {
//   onSlackClick: () => void
//   isPopoverOpen: boolean
//   setPopoverOpen: (open: boolean) => void
// }

// const Header: React.FC<SidebarHeaderExtendedProps> = ({
//   isCompact,
//   buttonTextColor,
//   onSlackClick,
//   isPopoverOpen,
//   setPopoverOpen
// }) => {
//   return (
//     <div className={HeaderVariants.container(isCompact)}>
//       {isCompact ? (
//         <div
//           onClick={onSlackClick}
//           role="button"
//           tabIndex={0}
//           onKeyDown={e => {
//             if (e.key === 'Enter' || e.key === ' ') {
//               onSlackClick()
//             }
//           }}
//           className={HeaderVariants.compactSlackButton()}>
//           <Icon
//             icon="logos:slack-icon"
//             className={HeaderVariants.icon(buttonTextColor, isCompact)}
//           />
//           <Icon
//             icon="lucide:chevron-down"
//             className={HeaderVariants.compactChevron()}
//           />
//         </div>
//       ) : (
//         <div className="flex items-center gap-3">
//           <div
//             onClick={onSlackClick}
//             className={HeaderVariants.expandedSlackButton()}>
//             <Icon
//               icon="logos:slack-icon"
//               className={HeaderVariants.icon(buttonTextColor, isCompact)}
//             />
//             <Icon
//               icon="lucide:chevron-down"
//               className={HeaderVariants.expandedChevron(isPopoverOpen)}
//             />
//           </div>

//           <Popover isOpen={isPopoverOpen} onOpenChange={setPopoverOpen}>
//             <Popover.Trigger>
//               <div
//                 onClick={() => setPopoverOpen(!isPopoverOpen)}
//                 className="cursor-pointer">
//                 <Avatar>
//                   <Avatar.Image
//                     alt="avatar"
//                     src="https://i.pravatar.cc/150?u=a04258114e29026702d"
//                   />
//                 </Avatar>
//               </div>
//             </Popover.Trigger>

//             <Popover.Content
//               placement="bottom"
//               className="relative z-[9999] p-1">
//               <Popover.Dialog>
//                 <Popover.Arrow />
//               </Popover.Dialog>

//               <UserPopoverCard />
//             </Popover.Content>
//           </Popover>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Header


import { forwardRef } from '@vezham/react-utils'
import { Icon } from '@iconify/react'
import React from 'react'
import { Avatar, Button, Card, Popover } from '@vezham/react/v3'
import { Props, useProps } from './types'



const UserPopoverCard = forwardRef<'div', Props>((props, ref) => {

  const { slots, classNames, getBaseProps } = useProps({ ...props, ref })
  const [isFollowed, setIsFollowed] = React.useState(false)
  
  return (
   
   <Card className={slots.card({ class: classNames?.card })}>
      <Card.Header className={slots.cardHeader({ class: classNames?.cardHeader })}>
        <div className={slots.userInfo({ class: classNames?.userInfo })}>
          <Avatar size="sm" className={slots.avatar({ class: classNames?.avatar })}>
            <Avatar.Image
              width={24}
              alt="avatar"
              src="https://i.pravatar.cc/150?u=a04258114e29026702d"
            />
         </Avatar>
         
        <div className={slots.userDetails({ class: classNames?.userDetails })}>
            <div className={slots.name({ class: classNames?.name })}>Zoey Lang</div>
            <div className={slots.username({ class: classNames?.username })}>@zoeylang</div>
          </div>
       </div>
       
        <Button
          size="sm"
          variant={isFollowed ? 'outline' : 'primary'}
          className={slots.followButton({ class: classNames?.followButton })}
          onPress={() => setIsFollowed(!isFollowed)}>
          {isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
      </Card.Header>
      <Card.Description className={slots.cardDescription({ class: classNames?.cardDescription })}>
        <p className={slots.bio({ class: classNames?.bio })}>
          Full-stack developer, @hero_ui lover she/her
        </p>
     </Card.Description>
      <Card.Footer className={slots.cardFooter({ class: classNames?.cardFooter })}>
        <div className={slots.statGroup({ class: classNames?.statGroup })}>
          <p className={slots.statNumber({ class: classNames?.statNumber })}>4</p>
          <p className={slots.statLabel({ class: classNames?.statLabel })}>Following</p>
        </div>
        <div className={slots.statGroup({ class: classNames?.statGroup })}>
          <p className={slots.statNumber({ class: classNames?.statNumber })}>97.1K</p>
          <p className={slots.statLabel({ class: classNames?.statLabel })}>Followers</p>
        </div>
     </Card.Footer>
    </Card>

  )
})

UserPopoverCard.displayName = 'UserPopoverCard'

const Header = forwardRef<'div', Props>((props, ref) => {
  const {
    Component,
    slots,
    classNames,
    isCompact,
    buttonTextColor,
    onSlackClick,
    isPopoverOpen,
    setPopoverOpen,
    getBaseProps
  } = useProps({
    ...props,
    ref
  })

  return (
    <Component {...getBaseProps()}>
      <div className={slots.container({ class: classNames?.container })}>

        {isCompact ? (
          <div
            onClick={onSlackClick}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSlackClick?.()
              }
            }}
            className={slots.compactSlackButton({ class: classNames?.compactSlackButton })}>
            <Icon
              icon="logos:slack-icon"
              className={slots.icon({ class: classNames?.icon, color: buttonTextColor, isCompact })}
            />
            <Icon
              icon="lucide:chevron-down"
              className={slots.compactChevron({ class: classNames?.compactChevron })}
            />
          </div>
        ) : (
            <div className={slots.expandedContainer({ class: classNames?.expandedContainer })}>
              
            <div
              onClick={onSlackClick}
              className={slots.expandedSlackButton({ class: classNames?.expandedSlackButton })}>
              <Icon
                icon="logos:slack-icon"
                className={slots.icon({ class: classNames?.icon, color: buttonTextColor, isCompact })}
              />
              <Icon
                icon="lucide:chevron-down"
                className={slots.expandedChevron({ class: classNames?.expandedChevron, isOpen: isPopoverOpen })}
              />
              </div>
              
            <Popover isOpen={isPopoverOpen} onOpenChange={setPopoverOpen}>
              <Popover.Trigger>
                <div
                  onClick={() => setPopoverOpen?.(!isPopoverOpen)}
                  className={slots.avatarTrigger({ class: classNames?.avatarTrigger })}>
                  <Avatar className={slots.avatar({ class: classNames?.avatar })}>
                    <Avatar.Image
                      alt="avatar"
                      src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                    />
                  </Avatar>
                </div>
              </Popover.Trigger>
              <Popover.Content
                placement="bottom"
                className={slots.popoverContent({ class: classNames?.popoverContent })}>
                <Popover.Dialog>
                  <Popover.Arrow className={slots.popoverArrow({ class: classNames?.popoverArrow })} />
                </Popover.Dialog>
                <UserPopoverCard />
              </Popover.Content>
              </Popover>
              
          </div>
        )}

      </div>
    </Component>
  )
})

Header.displayName = 'Header'

export { Header, UserPopoverCard }
