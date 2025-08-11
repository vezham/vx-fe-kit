import { Selection } from '@heroui/react'
import React from 'react'
import SidebarFooter from '../../components/sidebar-panel/sidebar-footer'
import SidebarHeader from '../../components/sidebar-panel/sidebar-header'
import SidebarMenu from '../../components/sidebar-panel/sidebar-menu'
import { items } from '../../components/sidebar-panel/sidebar-menu/sidebar-items'
import type { SidebarItem } from '../../components/sidebar-panel/sidebar-menu/types'

export default function Sidebar() {
  const [isCompact, setIsCompact] = React.useState(true)
  const [expandedKeys, setExpandedKeys] = React.useState<Selection>(new Set([]))
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  const [isRightSidebar, setIsRightSidebar] = React.useState(false)
  const [isRtl, setIsRtl] = React.useState(false)
  const [selectedKey, setSelectedKey] = React.useState('home')
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [selectedParentMenu, setSelectedParentMenu] =
    React.useState<SidebarItem | null>(null)

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

      if (selectedItem) {
        if (hasNestedItems(selectedItem)) {
          setSelectedParentMenu(selectedItem)
          if (isCompact) {
            setIsCompact(false)
            setExpandedKeys(new Set([selectedItem.key]))
          }
        } else if (!isCompact) {
          const parentItem = findParentItem(items, key)
          if (parentItem && hasNestedItems(parentItem)) {
            setSelectedParentMenu(parentItem)
          } else {
            setSelectedParentMenu(null)
          }
        }
      }
    },
    [isCompact, hasNestedItems, items]
  )

  const findParentItem = React.useCallback(
    (items: SidebarItem[], childKey: string): SidebarItem | null => {
      for (const item of items) {
        if (item.items?.some(subItem => subItem.key === childKey)) {
          return item
        }
        if (item.items?.length) {
          const found = findParentItem(item.items, childKey)
          if (found) return found
        }
      }
      return null
    },
    []
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
    <div
      className={`${isCompact ? 'w-20' : 'w-72 lg:w-80'} transition-width h-full flex-shrink-0 duration-300`}>
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
          selectedParentMenu={selectedParentMenu}
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
  )
}
