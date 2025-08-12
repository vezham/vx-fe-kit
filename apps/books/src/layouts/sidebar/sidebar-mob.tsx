import { Selection } from '@heroui/react'
import React from 'react'
import { longMenuItems } from '../../components/sidebar-mob/sidebar-menu/sidebar-items'
import { items } from '../../components/sidebar/sidebar-menu/sidebar-items'

import SidebarMobFooter from '../../components/sidebar-mob/sidebar-footer'
import SidebarMobHeader from '../../components/sidebar-mob/sidebar-header'
import BottomNavbar from '../../components/sidebar-mob/sidebar-menu'
import SidebarFooter from '../../components/sidebar/sidebar-footer'
import SidebarHeader from '../../components/sidebar/sidebar-header'
import SidebarMenu from '../../components/sidebar/sidebar-menu/sidebar'
import type { SidebarItem } from '../../components/sidebar/sidebar-menu/types'
import MessagingChatLayout from '../chat-inbox'

// New imports for ActionToolbar
import {
  otherActions,
  searchAction,
  viewActions
} from '../../components/actionbar/data'
import { ActionToolbar } from '../../components/actionbar/index'

export default function SidebarWithSearchInput() {
  const [isOpen, setIsOpen] = React.useState(true)
  const [isCompact, setIsCompact] = React.useState(true)
  const [expandedKeys, setExpandedKeys] = React.useState<Selection>(new Set([]))
  const [isDarkMode, setIsDarkMode] = React.useState(true)
  const [searchValue, setSearchValue] = React.useState('')
  const [isRightSidebar, setIsRightSidebar] = React.useState(false)
  const [isRtl, setIsRtl] = React.useState(false)
  const [selectedKey, setSelectedKey] = React.useState('home')
  const [activeKey, setActiveKey] = React.useState('home')
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

  const menuItemsForBottomNavbar = longMenuItems

  React.useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored) {
      setIsDarkMode(stored === 'dark')
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const hasNestedItems = React.useCallback((item: SidebarItem): boolean => {
    return !!(item.items?.length && item.type === 'nest')
  }, [])

  const handleItemSelect = React.useCallback(
    (key: string) => {
      setSelectedKey(key)
      const findItem = (
        items: SidebarItem[],
        targetKey: string
      ): SidebarItem | undefined => {
        for (const item of items) {
          if (item.key === targetKey) return item
          if (item.items?.length) {
            const found = findItem(item.items, targetKey)
            if (found) return found
          }
        }
        return undefined
      }

      const selectedItem = findItem(items, key)
      if (selectedItem && hasNestedItems(selectedItem) && isCompact) {
        setIsCompact(false)
        setExpandedKeys(new Set([selectedItem.key]))
      }
    },
    [isCompact, hasNestedItems]
  )

  const toggleDropdown = React.useCallback((key: string) => {
    setExpandedKeys(prev => {
      const newSet = new Set(prev)
      if (newSet.has(key)) newSet.delete(key)
      else newSet.add(key)
      return newSet
    })
  }, [])

  const filteredItems = React.useMemo(() => {
    if (!searchValue.trim()) return items
    const matchesSearch = (item: SidebarItem): boolean => {
      const titleMatches = item.title
        .toLowerCase()
        .includes(searchValue.toLowerCase())
      if (titleMatches) return true
      if (item.items && item.items.length > 0)
        return item.items.some(matchesSearch)
      return false
    }
    return items.filter(matchesSearch)
  }, [searchValue])

  const toggleTheme = () => setIsDarkMode(prev => !prev)
  const toggleDirection = () => setIsRightSidebar(prev => !prev)
  const toggleTextDirection = () => setIsRtl(prev => !prev)

  const toggleVisibility = () => {
    setIsCompact(prev => {
      if (!prev) setIsPopoverOpen(false)
      return !prev
    })
  }

  const handleSlackClick = React.useCallback(() => {
    if (isCompact) {
      setIsCompact(false)
      setIsPopoverOpen(false)
    } else {
      setIsPopoverOpen(open => !open)
    }
  }, [isCompact])

  const textColorClass = isDarkMode ? 'text-white' : 'text-black'
  const bgColorClass = isDarkMode ? 'bg-neutral-900' : 'bg-white'
  const scrollShadowBg = isDarkMode ? 'bg-neutral-900' : 'bg-white'
  const buttonTextColor = isDarkMode ? 'text-white' : 'text-black'

  const mobileNavItems = items.filter(item =>
    [
      'home',
      'bank',
      'books',
      'inventory',
      'reports',
      'widgets',
      'settings'
    ].includes(item.key)
  )

  return (
    <div className={`flex w-full flex-col ${isDarkMode ? '' : 'bg-gray-100'}`}>
      {/* Action Toolbar - common for both desktop & mobile */}
      <div className={`absolute top-20 right-3 z-50 sm:top-11 sm:right-5`}>
        <ActionToolbar
          isDarkMode={isDarkMode}
          showSearch={true}
          searchAction={searchAction}
          showViewActions={true}
          viewActions={viewActions}
          showOtherActions={true}
          otherActions={otherActions}
        />
      </div>

      {/* Desktop & Tablet Layout */}
      <div className="hidden w-full flex-row sm:flex">
        {/* Sidebar Section */}
        <div className={`${isCompact ? 'w-23' : 'w-75 lg:w-84'} flex-shrink-0`}>
          <div
            className={`flex h-full flex-col p-3 shadow-md ${bgColorClass} ${textColorClass}`}
            dir={isRtl ? 'rtl' : 'ltr'}>
            <SidebarHeader
              isCompact={isCompact}
              isRightSidebar={isRightSidebar}
              toggleVisibility={toggleVisibility}
              buttonTextColor={buttonTextColor}
              onSlackClick={handleSlackClick}
              isPopoverOpen={isPopoverOpen}
              setPopoverOpen={setIsPopoverOpen}
            />
            <SidebarMenu
              isCompact={isCompact}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              isDarkMode={isDarkMode}
              buttonTextColor={buttonTextColor}
              scrollShadowBg={scrollShadowBg}
              selectedKey={selectedKey}
              items={isCompact ? mobileNavItems : filteredItems}
              textColorClass={textColorClass}
              expandedKeys={expandedKeys}
              onExpandedChange={setExpandedKeys}
              onNestToggle={toggleDropdown}
              onSelect={handleItemSelect}
            />
            <SidebarFooter
              isCompact={isCompact}
              isDarkMode={isDarkMode}
              isRightSidebar={isRightSidebar}
              isRtl={isRtl}
              toggleTheme={toggleTheme}
              toggleTextDirection={toggleTextDirection}
              toggleDirection={toggleDirection}
              buttonTextColor={buttonTextColor}
            />
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1">
          <MessagingChatLayout isSidebarOpen={isOpen} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex min-h-screen w-full flex-col sm:hidden">
        {/* Top Navbar */}
        <div
          className={`flex items-center justify-between p-3 shadow-md ${bgColorClass} ${textColorClass}`}>
          <SidebarMobHeader
            isCompact
            isRightSidebar={isRightSidebar}
            toggleVisibility={toggleVisibility}
            buttonTextColor="text-primary"
            onSlackClick={handleSlackClick}
            isPopoverOpen={isPopoverOpen}
            setPopoverOpen={setIsPopoverOpen}
          />
          <SidebarMobFooter
            isCompact
            isDarkMode={isDarkMode}
            isRightSidebar={isRightSidebar}
            isRtl={isRtl}
            toggleTheme={toggleTheme}
            toggleTextDirection={toggleTextDirection}
            toggleDirection={toggleDirection}
            buttonTextColor={buttonTextColor}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4 pb-20">
          <MessagingChatLayout isSidebarOpen={isOpen} />
        </div>

        {/* Bottom Tab Navbar */}
        <BottomNavbar
          items={menuItemsForBottomNavbar}
          isDarkMode={isDarkMode}
          buttonTextColor={buttonTextColor}
          textColorClass={textColorClass}
          onSelect={setActiveKey}
          selectedKey={activeKey}
        />
      </div>
    </div>
  )
}
