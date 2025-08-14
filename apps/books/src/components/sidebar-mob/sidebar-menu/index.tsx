import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  useDisclosure
} from '@heroui/react'
import { Icon } from '@iconify/react'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SidebarItemType } from '../../sidebar-panel/sidebar-menu/types'
import { BottomNavbarProps } from './types'
import {
  getDrawerBodyClasses,
  getDrawerButtonClasses,
  getDrawerCloseButtonClasses,
  getDrawerContentClasses,
  getDrawerGridClasses,
  getDrawerGridItemInnerClasses,
  getDrawerHeaderClasses,
  getNavbarButtonClasses,
  getNavbarContainerClasses,
  getNavbarIconClasses,
  getNavbarMenuContainerClasses,
  getSearchButtonClasses
} from './variant'

/* ----------- Helper to Flatten Nested Menu ----------- */
const flattenMenuItems = (menuItems: any[]) => {
  const flatList: any[] = []

  menuItems.forEach(item => {
    if (item.type === SidebarItemType.Nest && Array.isArray(item.items)) {
      flatList.push({ ...item, isParent: true })
      item.items.forEach(child => {
        flatList.push({ ...child, parentKey: item.key })
      })
    } else {
      flatList.push(item)
    }
  })

  return flatList
}

/* ---------------- Drawer for More Items ---------------- */
const BottomDrawerMenu: React.FC<any> = ({
  items,
  selectedKey,
  onItemSelect,
  isOpen,
  onClose,
  isDarkMode,
  buttonTextColor
}) => {
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) onClose()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen, onClose])

  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onOpenChange={open => !open && onClose()}>
      <DrawerContent className={getDrawerContentClasses({ isDarkMode })}>
        <DrawerHeader className={getDrawerHeaderClasses({ isDarkMode })}>
          <button
            onClick={onClose}
            className={getDrawerCloseButtonClasses({ isDarkMode })}>
            <Icon icon="lucide:x" className="h-4 w-4" />
          </button>
        </DrawerHeader>
        <DrawerBody className={getDrawerBodyClasses()}>
          <div className={getDrawerGridClasses()}>
            {items.map(item => (
              <button
                key={item.key}
                onClick={() => {
                  onItemSelect(item)
                  onClose()
                }}
                className={getDrawerButtonClasses({
                  isSelected: selectedKey === item.key,
                  isDarkMode
                })}>
                <div className={getDrawerGridItemInnerClasses(buttonTextColor)}>
                  {item.icon && <Icon icon={item.icon} className="h-6 w-6" />}
                  <span className="text-center">{item.title}</span>
                </div>
              </button>
            ))}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

/* ---------------- Bottom Navbar ---------------- */
const BottomNavbar: React.FC<BottomNavbarProps> = ({
  items,
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

  if (!Array.isArray(items) || items.length === 0) return null

  const flatItems = useMemo(() => flattenMenuItems(items), [items])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [mainVisibleCount, setMainVisibleCount] = useState(flatItems.length)

  // Highlight active route on page load / refresh
  useEffect(() => {
    const currentItem = flatItems.find(item =>
      location.pathname === '/'
        ? item.path === '/'
        : location.pathname.startsWith(item.path || '')
    )
    if (currentItem && onSelect) {
      onSelect(currentItem.key)
    }
  }, [location.pathname, flatItems, onSelect])

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      let visibleCount = 5
      if (screenWidth < 767) {
        if (screenWidth < 767) visibleCount = Math.min(flatItems.length, 5)
        if (screenWidth < 650) visibleCount = Math.min(flatItems.length, 4)
        if (screenWidth < 500) visibleCount = Math.min(flatItems.length, 3)
        if (screenWidth < 425) visibleCount = Math.min(flatItems.length, 2)
        if (screenWidth < 350) visibleCount = Math.min(flatItems.length, 1)
        if (screenWidth < 300) visibleCount = 0
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

  /* Handles both selection & navigation */
  const handleItemSelect = (item: any) => {
    onSelect?.(item.key)
    if (item.href) {
      navigate(item.href)
    }
  }

  return (
    <>
      <div
        className={`${getNavbarContainerClasses({
          bgColorClass,
          isDarkMode
        })} justify-between`}>
        <div className={getNavbarMenuContainerClasses({ isDarkMode })}>
          {mainItems.map(item => (
            <button
              key={item.key}
              onClick={() => handleItemSelect(item)}
              className={getNavbarButtonClasses({
                isSelected: selectedKey === item.key,
                isDarkMode,
                textColorClass
              })}>
              {item.icon && (
                <Icon
                  icon={item.icon}
                  className={getNavbarIconClasses({
                    isSelected: selectedKey === item.key,
                    isDarkMode
                  })}
                />
              )}
              <span className="mt-1">{item.title}</span>
            </button>
          ))}
          {showMoreButton && (
            <button
              onClick={onOpen}
              className={getNavbarButtonClasses({
                isDarkMode,
                textColorClass
              })}>
              <Icon
                icon="lucide:more-horizontal"
                className={getNavbarIconClasses({ isDarkMode })}
              />
              <span className="mt-1">More</span>
            </button>
          )}
        </div>

        {hasMoreAction && (
          <button
            className={getSearchButtonClasses({ isDarkMode })}
            onClick={() => console.log('Search clicked')}>
            <Icon icon="lucide:search" className="m-auto h-6 w-6" />
          </button>
        )}
      </div>

      <BottomDrawerMenu
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

export default BottomNavbar
