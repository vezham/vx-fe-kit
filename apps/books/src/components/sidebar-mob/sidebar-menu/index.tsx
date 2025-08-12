import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  useDisclosure
} from '@heroui/react'
import { Icon } from '@iconify/react'
import React, { useEffect, useMemo, useState } from 'react'
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

/* ---------------- Drawer for More Items ---------------- */
const BottomDrawerMenu: React.FC<any> = ({
  items,
  selectedKey,
  onSelect,
  isOpen,
  onClose,
  isDarkMode,
  buttonTextColor
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const toggleExpand = () => {
    setIsExpanded(prev => !prev)
  }

  // Add resize event listener to close drawer on resize
  React.useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        onClose()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
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
        <DrawerBody className={getDrawerBodyClasses({ isExpanded })}>
          <div className={getDrawerGridClasses()}>
            {items.map(item => (
              <button
                key={item.key}
                onClick={() => {
                  onSelect(item.key)
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
  if (!Array.isArray(items) || items.length === 0) return null

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [mainVisibleCount, setMainVisibleCount] = useState(items.length)

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      let visibleCount = 5

      if (screenWidth < 650) {
        if (screenWidth < 550) visibleCount = Math.min(items.length, 4)
        if (screenWidth < 500) visibleCount = Math.min(items.length, 3)
        if (screenWidth < 400) visibleCount = Math.min(items.length, 2)
        if (screenWidth < 300) visibleCount = Math.min(items.length, 1)
        if (screenWidth < 250) visibleCount = 0
      }
      setMainVisibleCount(visibleCount)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [items.length])

  const showMoreButton = mainVisibleCount < items.length

  const mainItems = useMemo(() => {
    const count = showMoreButton ? mainVisibleCount : items.length
    return items.slice(0, count)
  }, [items, mainVisibleCount, showMoreButton])

  const moreItems = useMemo(() => {
    return showMoreButton ? items.slice(mainVisibleCount) : []
  }, [items, mainVisibleCount, showMoreButton])

  const handleSelect = (key: string) => {
    onSelect(key)
    onClose()
  }

  return (
    <>
      <div
        className={`${getNavbarContainerClasses({ bgColorClass, isDarkMode })} justify-between`}>
        <div className={getNavbarMenuContainerClasses({ isDarkMode })}>
          {mainItems.map(item => (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
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
        onSelect={handleSelect}
        isOpen={isOpen}
        onClose={onClose}
        isDarkMode={isDarkMode}
        buttonTextColor={buttonTextColor}
      />
    </>
  )
}

export default BottomNavbar
