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
  getDrawerButtonClasses,
  getDrawerContentClasses,
  getDrawerHeaderClasses,
  getNavbarButtonClasses,
  getNavbarContainerClasses,
  getNavbarIconClasses,
  getNavbarMenuContainerClasses,
  getSearchButtonClasses
} from './variant'

const BottomDrawerMenu: React.FC<any> = ({
  items,
  selectedKey,
  onSelect,
  isOpen,
  onClose,
  isDarkMode,
  buttonTextColor
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onOpenChange={open => !open && onClose()}>
      <DrawerContent className={getDrawerContentClasses({ isDarkMode })}>
        <>
          <DrawerHeader className={getDrawerHeaderClasses({ isDarkMode })}>
            Menu Options
          </DrawerHeader>
          <DrawerBody className="max-h-[45vh] overflow-y-auto">
            <div className="flex flex-col items-start gap-5 px-2">
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
                  <div className="flex items-center gap-3">
                    {item.icon && (
                      <Icon
                        icon={item.icon}
                        className={`h-5 w-5 ${buttonTextColor}`}
                      />
                    )}
                    <span className={`${buttonTextColor}`}>{item.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </DrawerBody>
        </>
      </DrawerContent>
    </Drawer>
  )
}

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
      let baseVisibleCount

      if (items.length > 5) {
        baseVisibleCount = 4
        if (screenWidth >= 650) {
          baseVisibleCount = items.length
        } else {
          if (screenWidth < 500)
            baseVisibleCount = Math.max(baseVisibleCount - 1, 1)
          if (screenWidth < 400)
            baseVisibleCount = Math.max(baseVisibleCount - 1, 1)
          if (screenWidth < 300)
            baseVisibleCount = Math.max(baseVisibleCount - 1, 1)
          if (screenWidth < 230) baseVisibleCount = 1
        }
      } else {
        if (screenWidth < 300) {
          const estimatedWidth = items.length * 60
          if (estimatedWidth > screenWidth) {
            baseVisibleCount = Math.max(items.length - 1, 1)
          } else {
            baseVisibleCount = items.length
          }
        } else {
          baseVisibleCount = items.length
        }
      }

      setMainVisibleCount(baseVisibleCount)
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
        className={`${getNavbarContainerClasses({ bgColorClass, isDarkMode })} ${
          mainItems.length > 1 ? 'justify-center' : 'justify-between'
        }`}>
        <div
          className={getNavbarMenuContainerClasses({
            isDarkMode,
            hasMoreAction,
            itemCount: mainItems.length
          })}>
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

        {/* Search Button */}
        {hasMoreAction && (
          <button
            className={`${getSearchButtonClasses({ isDarkMode })} ${
              mainItems.length < 4 ? 'ml-4' : 'ml-1'
            }`}
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
