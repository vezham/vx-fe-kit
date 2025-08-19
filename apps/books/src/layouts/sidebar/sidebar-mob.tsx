import { Outlet } from '@tanstack/react-router'
import React from 'react'
import { useTheme } from '../../common/context'
import SidebarMobFooter from '../../components/sidebar-mob/sidebar-footer'
import SidebarMobHeader from '../../components/sidebar-mob/sidebar-header'
import BottomNavbar from '../../components/sidebar-mob/sidebar-menu'
import { longMenuItems } from '../../components/sidebar-mob/sidebar-menu/sidebar-items'
import SidebarFooter from '../../components/sidebar-panel/sidebar-footer'
import SidebarHeader from '../../components/sidebar-panel/sidebar-header'
import SidebarMenu from '../../components/sidebar-panel/sidebar-menu/sidebar'
import { items } from '../../components/sidebar-panel/sidebar-menu/sidebar-items'
import type { SidebarItem } from '../../components/sidebar-panel/sidebar-menu/types'

export default function SidebarWithSearchInput() {
  const { isDarkMode, toggleTheme } = useTheme()
  const [isCompact, setIsCompact] = React.useState(true)
  const [expandedKeys, setExpandedKeys] = React.useState<Set<string>>(new Set())
  const [searchValue, setSearchValue] = React.useState('')
  const [isRightSidebar, setIsRightSidebar] = React.useState(false)
  const [isRtl, setIsRtl] = React.useState(false)
  const [selectedKey, setSelectedKey] = React.useState('home')
  const [activeKey, setActiveKey] = React.useState('home')
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

  const menuItemsForBottomNavbar = longMenuItems

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

  // Theme-dependent styles
  const textColorClass = isDarkMode ? 'text-white' : 'text-black'
  const bgColorClass = isDarkMode ? 'bg-neutral-900' : 'bg-white'
  const bgSidebarClass = isDarkMode
    ? 'bg-neutral-800 shadow'
    : 'bg-default-100 shadow-sm'
  const scrollShadowBg = isDarkMode ? 'bg-neutral-900' : 'bg-white'
  const buttonTextColor = isDarkMode ? 'text-white' : 'text-black'

  const mobileNavItems = items.filter(item =>
    ['bank', 'books', 'inventory', 'reports', 'widgets', 'settings'].includes(
      item.key
    )
  )

  return (
    <div
      className={`${bgColorClass} ${textColorClass} flex min-h-screen flex-col`}>
      {/* Desktop & Tablet */}
      <div className="m-4 hidden h-[calc(100vh-2rem)] overflow-hidden md:flex">
        <div
          className={`${bgColorClass} ${textColorClass} flex h-full w-full gap-4 overflow-hidden`}>
          <div
            className={`${isCompact ? 'w-22' : 'w-54 lg:w-65'} h-full flex-shrink-0`}>
            <div
              className={`flex h-full flex-col rounded-lg shadow-md ${bgSidebarClass} ${textColorClass}`}
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
              <div className="flex-1 overflow-y-auto">
                <SidebarMenu
                  items={isCompact ? mobileNavItems : filteredItems}
                  selectedKey={selectedKey}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  isCompact={isCompact}
                  iaDarkMode={isDarkMode}
                  buttonTextColor={buttonTextColor}
                  scrollShadowBg={scrollShadowBg}
                  textColorClass={textColorClass}
                  expandedKeys={expandedKeys}
                  onExpandedChange={keys => setExpandedKeys(keys || new Set())}
                  onNestToggle={toggleDropdown}
                  onSelect={handleItemSelect}
                />
              </div>
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
          <div className="scrollbar-hide h-full flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="relative flex min-h-screen flex-1 flex-col md:hidden">
        <div
          className={`fixed top-0 right-0 left-0 z-50 flex p-3 shadow-md ${bgSidebarClass} ${textColorClass}`}>
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

        <div className="flex-1 overflow-y-auto p-4 pt-20 pb-20">
          <Outlet />
        </div>

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
