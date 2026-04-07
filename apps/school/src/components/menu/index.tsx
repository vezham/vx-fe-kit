// import { Icon } from '@iconify/react'
// import { useLocation, useNavigate } from '@tanstack/react-router'
// import React, { useEffect, useMemo, useState } from 'react'
// import { useDisclosure } from '@vezham/react/v2'
// import MenuDrawer from './drawer'

// import { BottomNavbarProps, SidebarItem, SidebarItemType } from './types'

// import {
//   getNavbarButtonClasses,
//   getNavbarContainerClasses,
//   getNavbarIconClasses,
//   getNavbarMenuContainerClasses,
//   getSearchButtonClasses
// } from './variant'

// import { Button } from '@vezham/react/v3'

// const flattenMenuItems = (menuItems: SidebarItem[] = []): SidebarItem[] => {
//   const flatList: SidebarItem[] = []

//   menuItems.forEach(item => {
//     if (item.type === SidebarItemType.Nest && Array.isArray(item.items)) {
//       flatList.push({ ...item })
//       item.items.forEach(child => {
//         flatList.push({ ...child })
//       })
//     } else {
//       flatList.push(item)
//     }
//   })

//   return flatList
// }

// const BottomNavbar: React.FC<BottomNavbarProps> = ({
//   items = [],
//   selectedKey,
//   onSelect,
//   isDarkMode = false,
//   bgColorClass,
//   hasMoreAction = true,
//   textColorClass,
//   buttonTextColor
// }) => {
//   const navigate = useNavigate()
//   const location = useLocation()

//   const flatItems = useMemo(() => flattenMenuItems(items), [items])

//   const { isOpen, onOpen, onClose } = useDisclosure()
//   const [mainVisibleCount, setMainVisibleCount] = useState(flatItems.length)

//   useEffect(() => {
//     const currentItem = flatItems.find(item =>
//       location.pathname === '/'
//         ? item.href === '/'
//         : location.pathname.startsWith(item.href ?? '')
//     )

//     if (currentItem) {
//       onSelect(currentItem.key)
//     }
//   }, [location.pathname, flatItems, onSelect])

//   useEffect(() => {
//     const handleResize = () => {
//       const screenWidth = window.innerWidth
//       let visibleCount = 7

//       if (screenWidth < 767) {
//         if (screenWidth < 700) visibleCount = Math.min(flatItems.length, 6)
//         if (screenWidth < 650) visibleCount = Math.min(flatItems.length, 5)
//         if (screenWidth < 540) visibleCount = Math.min(flatItems.length, 4)
//         if (screenWidth < 460) visibleCount = Math.min(flatItems.length, 3)
//         if (screenWidth < 380) visibleCount = Math.min(flatItems.length, 2)
//         if (screenWidth < 300) visibleCount = 1
//       }

//       setMainVisibleCount(visibleCount)
//     }

//     window.addEventListener('resize', handleResize)
//     handleResize()

//     return () => window.removeEventListener('resize', handleResize)
//   }, [flatItems.length])

//   const showMoreButton = mainVisibleCount < flatItems.length

//   const mainItems = useMemo(() => {
//     const count = showMoreButton ? mainVisibleCount : flatItems.length
//     return flatItems.slice(0, count)
//   }, [flatItems, mainVisibleCount, showMoreButton])

//   const moreItems = useMemo(() => {
//     return showMoreButton ? flatItems.slice(mainVisibleCount) : []
//   }, [flatItems, mainVisibleCount, showMoreButton])

//   const handleItemSelect = (item: SidebarItem) => {
//     onSelect(item.key)

//     if (item.href) {
//       navigate({ to: item.href })
//     }
//   }

//   if (flatItems.length === 0) return null

//   return (
//     <>
//       <div
//         className={`${getNavbarContainerClasses({
//           bgColorClass,
//           isDarkMode
//         })} justify-between`}>

//         <div className={getNavbarMenuContainerClasses({ isDarkMode })}>

//           {mainItems.map(item => {
//             const isActive = selectedKey === item.key
//             const iconName = isActive
//               ? item.iconActive || item.icon
//               : item.icon
//             return (
//               <div
//                 key={item.key}
//                 onClick={() => handleItemSelect(item)}
//                 className={getNavbarButtonClasses({
//                   isSelected: isActive,
//                   isDarkMode,
//                   textColorClass
//                 })}>
//                 {iconName && (
//                   <Icon
//                     width={24}
//                     icon={iconName}
//                     className={getNavbarIconClasses({
//                       isSelected: isActive,
//                       isDarkMode
//                     })}
//                   />
//                 )}

//                 {item.title}
//               </div>
//             )
//           })}

//           {showMoreButton && (
//             <div
//               onClick={onOpen}
//               className={getNavbarButtonClasses({
//                 isDarkMode,
//                 textColorClass
//               })}>
//               <Icon
//                 width={24}
//                 icon="lucide:more-horizontal"
//                 className={getNavbarIconClasses({ isDarkMode })}
//               />
//               More
//             </div> )}
//         </div>

//         {hasMoreAction && (
//           <Button className={getSearchButtonClasses({ isDarkMode })} variant='ghost'>
//             <Icon icon="lucide:search" className="m-auto h-6 w-6" />
//           </Button>
//         )}
//       </div>
//       <MenuDrawer
//         items={moreItems}
//         selectedKey={selectedKey}
//         onItemSelect={handleItemSelect}
//         isOpen={isOpen}
//         onClose={onClose}
//         isDarkMode={isDarkMode}
//         buttonTextColor={buttonTextColor}
//       />
//     </>
//   )
// }

// export { BottomNavbar }

'use client'

import { Icon } from '@iconify/react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import React, { useEffect, useMemo, useState } from 'react'

import { useDisclosure } from '@vezham/react/v2'
import { Button } from '@vezham/react/v3'

import MenuDrawer from './drawer'
import { BottomNavbarProps, SidebarItem, SidebarItemType } from './types'
import {
  getNavbarButtonClasses,
  getNavbarContainerClasses,
  getNavbarIconClasses,
  getNavbarMenuContainerClasses,
  getSearchButtonClasses
} from './variant'

// import { Icon } from '@iconify/react'
// import { useLocation, useNavigate } from '@tanstack/react-router'
// import React, { useEffect, useMemo, useState } from 'react'
// import { useDisclosure } from '@vezham/react/v2'
// import MenuDrawer from './drawer'

// import { BottomNavbarProps, SidebarItem, SidebarItemType } from './types'

// import {
//   getNavbarButtonClasses,
//   getNavbarContainerClasses,
//   getNavbarIconClasses,
//   getNavbarMenuContainerClasses,
//   getSearchButtonClasses
// } from './variant'

// import { Button } from '@vezham/react/v3'

// const flattenMenuItems = (menuItems: SidebarItem[] = []): SidebarItem[] => {
//   const flatList: SidebarItem[] = []

//   menuItems.forEach(item => {
//     if (item.type === SidebarItemType.Nest && Array.isArray(item.items)) {
//       flatList.push({ ...item })
//       item.items.forEach(child => {
//         flatList.push({ ...child })
//       })
//     } else {
//       flatList.push(item)
//     }
//   })

//   return flatList
// }

// const BottomNavbar: React.FC<BottomNavbarProps> = ({
//   items = [],
//   selectedKey,
//   onSelect,
//   isDarkMode = false,
//   bgColorClass,
//   hasMoreAction = true,
//   textColorClass,
//   buttonTextColor
// }) => {
//   const navigate = useNavigate()
//   const location = useLocation()

//   const flatItems = useMemo(() => flattenMenuItems(items), [items])

//   const { isOpen, onOpen, onClose } = useDisclosure()
//   const [mainVisibleCount, setMainVisibleCount] = useState(flatItems.length)

//   useEffect(() => {
//     const currentItem = flatItems.find(item =>
//       location.pathname === '/'
//         ? item.href === '/'
//         : location.pathname.startsWith(item.href ?? '')
//     )

//     if (currentItem) {
//       onSelect(currentItem.key)
//     }
//   }, [location.pathname, flatItems, onSelect])

//   useEffect(() => {
//     const handleResize = () => {
//       const screenWidth = window.innerWidth
//       let visibleCount = 7

//       if (screenWidth < 767) {
//         if (screenWidth < 700) visibleCount = Math.min(flatItems.length, 6)
//         if (screenWidth < 650) visibleCount = Math.min(flatItems.length, 5)
//         if (screenWidth < 540) visibleCount = Math.min(flatItems.length, 4)
//         if (screenWidth < 460) visibleCount = Math.min(flatItems.length, 3)
//         if (screenWidth < 380) visibleCount = Math.min(flatItems.length, 2)
//         if (screenWidth < 300) visibleCount = 1
//       }

//       setMainVisibleCount(visibleCount)
//     }

//     window.addEventListener('resize', handleResize)
//     handleResize()

//     return () => window.removeEventListener('resize', handleResize)
//   }, [flatItems.length])

//   const showMoreButton = mainVisibleCount < flatItems.length

//   const mainItems = useMemo(() => {
//     const count = showMoreButton ? mainVisibleCount : flatItems.length
//     return flatItems.slice(0, count)
//   }, [flatItems, mainVisibleCount, showMoreButton])

//   const moreItems = useMemo(() => {
//     return showMoreButton ? flatItems.slice(mainVisibleCount) : []
//   }, [flatItems, mainVisibleCount, showMoreButton])

//   const handleItemSelect = (item: SidebarItem) => {
//     onSelect(item.key)

//     if (item.href) {
//       navigate({ to: item.href })
//     }
//   }

//   if (flatItems.length === 0) return null

//   return (
//     <>
//       <div
//         className={`${getNavbarContainerClasses({
//           bgColorClass,
//           isDarkMode
//         })} justify-between`}>

//         <div className={getNavbarMenuContainerClasses({ isDarkMode })}>

//           {mainItems.map(item => {
//             const isActive = selectedKey === item.key
//             const iconName = isActive
//               ? item.iconActive || item.icon
//               : item.icon
//             return (
//               <div
//                 key={item.key}
//                 onClick={() => handleItemSelect(item)}
//                 className={getNavbarButtonClasses({
//                   isSelected: isActive,
//                   isDarkMode,
//                   textColorClass
//                 })}>
//                 {iconName && (
//                   <Icon
//                     width={24}
//                     icon={iconName}
//                     className={getNavbarIconClasses({
//                       isSelected: isActive,
//                       isDarkMode
//                     })}
//                   />
//                 )}

//                 {item.title}
//               </div>
//             )
//           })}

//           {showMoreButton && (
//             <div
//               onClick={onOpen}
//               className={getNavbarButtonClasses({
//                 isDarkMode,
//                 textColorClass
//               })}>
//               <Icon
//                 width={24}
//                 icon="lucide:more-horizontal"
//                 className={getNavbarIconClasses({ isDarkMode })}
//               />
//               More
//             </div> )}
//         </div>

//         {hasMoreAction && (
//           <Button className={getSearchButtonClasses({ isDarkMode })} variant='ghost'>
//             <Icon icon="lucide:search" className="m-auto h-6 w-6" />
//           </Button>
//         )}
//       </div>
//       <MenuDrawer
//         items={moreItems}
//         selectedKey={selectedKey}
//         onItemSelect={handleItemSelect}
//         isOpen={isOpen}
//         onClose={onClose}
//         isDarkMode={isDarkMode}
//         buttonTextColor={buttonTextColor}
//       />
//     </>
//   )
// }

// export { BottomNavbar }

const flattenMenuItems = (menuItems: SidebarItem[] = []): SidebarItem[] => {
  const flatList: SidebarItem[] = []

  menuItems.forEach(item => {
    if (item.type === SidebarItemType.Nest && Array.isArray(item.items)) {
      flatList.push({ ...item })
      item.items.forEach(child => {
        flatList.push({ ...child })
      })
    } else {
      flatList.push(item)
    }
  })

  return flatList
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({
  items = [],
  selectedKey,
  onSelect,
  isDarkMode = false,
  bgColorClass,
  hasMoreAction = true,
  textColorClass,
  buttonTextColor
}) => {
  const navigate = useNavigate()
  const location = useLocation()

  const flatItems = useMemo(() => flattenMenuItems(items), [items])

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [mainVisibleCount, setMainVisibleCount] = useState(flatItems.length)

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      let visibleCount = 7

      if (screenWidth < 767) {
        if (screenWidth < 700) visibleCount = Math.min(flatItems.length, 6)
        if (screenWidth < 650) visibleCount = Math.min(flatItems.length, 5)
        if (screenWidth < 540) visibleCount = Math.min(flatItems.length, 4)
        if (screenWidth < 460) visibleCount = Math.min(flatItems.length, 3)
        if (screenWidth < 380) visibleCount = Math.min(flatItems.length, 2)
        if (screenWidth < 300) visibleCount = 1
      }

      setMainVisibleCount(visibleCount)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [flatItems.length])

  const showMoreButton = mainVisibleCount < flatItems.length

  const mainItems = useMemo(() => {
    const count = showMoreButton ? mainVisibleCount : flatItems.length
    return flatItems.slice(0, count)
  }, [flatItems, mainVisibleCount, showMoreButton])

  const moreItems = useMemo(() => {
    return showMoreButton ? flatItems.slice(mainVisibleCount) : []
  }, [flatItems, mainVisibleCount, showMoreButton])

  const handleItemSelect = (item: SidebarItem) => {
    onSelect?.(item.key)

    if (item.href) {
      navigate({ to: item.href })
    }
  }

  if (flatItems.length === 0) return null

  return (
    <>
      <div
        className={`${getNavbarContainerClasses({
          bgColorClass,
          isDarkMode
        })} justify-between`}>
        <div className={getNavbarMenuContainerClasses({ isDarkMode })}>
          {mainItems.map(item => {
            const activeItem = flatItems.find(
              i =>
                location.pathname === i.href ||
                (i.href !== '/' && location.pathname.startsWith(i.href ?? ''))
            )

            const isActive = activeItem
              ? activeItem.key === item.key
              : item.key === flatItems[0]?.key

            const iconName = isActive ? item.iconActive || item.icon : item.icon

            return (
              <div
                key={item.key}
                onClick={() => handleItemSelect(item)}
                className={getNavbarButtonClasses({
                  isSelected: isActive,
                  isDarkMode,
                  textColorClass
                })}>
                {iconName && (
                  <Icon
                    width={24}
                    icon={iconName}
                    className={getNavbarIconClasses({
                      isSelected: isActive,
                      isDarkMode
                    })}
                  />
                )}

                {item.title}
              </div>
            )
          })}

          {showMoreButton && (
            <div
              onClick={onOpen}
              className={getNavbarButtonClasses({
                isDarkMode,
                textColorClass
              })}>
              <Icon
                width={24}
                icon="lucide:more-horizontal"
                className={getNavbarIconClasses({ isDarkMode })}
              />
              More
            </div>
          )}
        </div>

        {hasMoreAction && (
          <Button
            className={getSearchButtonClasses({ isDarkMode })}
            variant="ghost">
            <Icon icon="lucide:search" className="m-auto h-6 w-6" />
          </Button>
        )}
      </div>

      <MenuDrawer
        items={moreItems}
        selectedKey={selectedKey}
        onItemSelect={handleItemSelect}
        isOpen={isOpen}
        onClose={onClose}
        isDarkMode={isDarkMode}
        buttonTextColor={buttonTextColor}
      />
    </>
  )
}

export { BottomNavbar }
