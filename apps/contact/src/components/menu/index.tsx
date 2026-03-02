'use client'

import { Icon } from '@iconify/react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import React, { useEffect, useMemo, useState } from 'react'

import { useDisclosure } from '@vezham/react/v2'

import MenuDrawer from './drawer'
import { BottomNavbarProps, SidebarItem, SidebarItemType } from './types'
import {
  getNavbarButtonClasses,
  getNavbarContainerClasses,
  getNavbarIconClasses,
  getNavbarMenuContainerClasses,
  getSearchButtonClasses
} from './variant'

const flattenMenuItems = (menuItems: SidebarItem[] = []): SidebarItem[] => {
  const flatList: SidebarItem[] = []

  menuItems.forEach(item => {
    if (item.type === SidebarItemType.Nest && Array.isArray(item.items)) {
      item.items.forEach(child => flatList.push(child))
    } else {
      flatList.push(item)
    }
  })

  return flatList
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({
  items = [],
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

  /* Responsive visible items */
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      let count = 5

      if (width < 540) count = 4
      if (width < 460) count = 3
      if (width < 380) count = 2

      setMainVisibleCount(Math.min(count, flatItems.length))
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [flatItems.length])

  const showMoreButton = mainVisibleCount < flatItems.length

  const mainItems = flatItems.slice(
    0,
    showMoreButton ? mainVisibleCount : flatItems.length
  )

  const moreItems = showMoreButton ? flatItems.slice(mainVisibleCount) : []

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
            const isActive =
              item.href === '/'
                ? location.pathname === '/'
                : location.pathname === item.href ||
                  location.pathname.startsWith(item.href + '/')

            return (
              <button
                key={item.key}
                onClick={() => item.href && navigate({ to: item.href })}
                className={getNavbarButtonClasses({
                  isSelected: isActive,
                  isDarkMode,
                  textColorClass
                })}>
                {item.icon && (
                  <Icon
                    icon={item.icon}
                    className={getNavbarIconClasses({
                      isSelected: isActive,
                      isDarkMode
                    })}
                  />
                )}
                <span className="mt-1">{item.title}</span>
              </button>
            )
          })}

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
          <button className={getSearchButtonClasses({ isDarkMode })}>
            <Icon icon="lucide:search" className="h-6 w-6" />
          </button>
        )}
      </div>

      <MenuDrawer
        items={moreItems}
        isOpen={isOpen}
        onClose={onClose}
        isDarkMode={isDarkMode}
        buttonTextColor={buttonTextColor}
      />
    </>
  )
}

export { BottomNavbar }
