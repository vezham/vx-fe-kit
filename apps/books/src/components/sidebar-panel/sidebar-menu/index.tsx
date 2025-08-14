import { Input, ScrollShadow } from '@heroui/react'
import { Icon } from '@iconify/react'
import React, { useCallback, useEffect, useState } from 'react'
import Sidebar from './sidebar'
import { SidebarItem, SidebarMenuProps } from './types'
import {
  getInputClassName,
  getScrollShadowClassName,
  getSearchIconClassName,
  getSidebarMenuItemBaseClass,
  getSidebarMenuTitleClass
} from './variant'

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  isCompact,
  searchValue,
  setSearchValue,
  isDarkMode,
  buttonTextColor,
  scrollShadowBg,
  selectedKey,
  selectedParentMenu,
  items,
  textColorClass,
  expandedKeys,
  onExpandedChange,
  onNestToggle,
  onSelect
}) => {
  const [visibleItemsCount, setVisibleItemsCount] = useState(6)
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(true)

  const handleResize = useCallback(() => {
    const screenWidth = window.innerWidth
    if (screenWidth >= 1280) {
      setVisibleItemsCount(7)
    } else if (screenWidth >= 1024) {
      setVisibleItemsCount(6)
    } else if (screenWidth >= 768) {
      setVisibleItemsCount(5)
    } else {
      setVisibleItemsCount(4)
    }
  }, [])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  const sidebarItemsToRender: SidebarItem[] = isMoreMenuOpen
    ? items
    : items.slice(0, visibleItemsCount - 1)

  if (!isMoreMenuOpen && items.length > visibleItemsCount - 1) {
    sidebarItemsToRender.push({
      key: 'more-button',
      title: 'More',
      icon: 'lucide:more-horizontal',
      onClick: () => setIsMoreMenuOpen(true)
    } as SidebarItem)
  }

  const onCloseSubmenu = useCallback(() => {
    setIsSubmenuOpen(false)
    onNestToggle?.('')
    onSelect?.('')
  }, [onNestToggle, onSelect])

  const renderRightPanel = () => {
    if (!isSubmenuOpen || !selectedParentMenu?.items) {
      return (
        <div className="text-default-400 flex h-full items-center justify-center">
          <p className="text-sm">Select a menu item</p>
        </div>
      )
    }

    return (
      <>
        <div className="mb-3 flex items-center justify-between">
          <h3 className={`text-md font-medium ${textColorClass}`}>
            {selectedParentMenu.title}
          </h3>
          <div
            className="text-default-400 hover:text-default-500 cursor-pointer"
            onClick={onCloseSubmenu}>
            <Icon icon="lucide:x" className="h-5 w-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1 pl-1">
          {selectedParentMenu.items.map(item => (
            <div
              key={item.key}
              className={`flex items-center gap-3 rounded-lg p-2 ${
                selectedKey === item.key
                  ? 'bg-default-100'
                  : 'hover:bg-default-50'
              }`}
              onClick={() => onSelect?.(item.key)}>
              {item.icon && (
                <Icon
                  icon={item.icon}
                  className={`${buttonTextColor} h-5 w-5`}
                />
              )}
              <span className={`text-sm font-medium ${textColorClass}`}>
                {item.title}
              </span>
              {item.endContent && (
                <span className="text-default-500 ml-auto text-xs">
                  {item.endContent}
                </span>
              )}
            </div>
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      {!isCompact && (
        <Input
          fullWidth
          aria-label="search"
          className={getInputClassName({ isDarkMode })}
          placeholder="Search..."
          value={searchValue}
          onValueChange={setSearchValue}
          startContent={
            <Icon
              icon="lucide:search"
              width={16}
              className={getSearchIconClassName({ buttonTextColor })}
            />
          }
        />
      )}

      <ScrollShadow className={getScrollShadowClassName({ scrollShadowBg })}>
        {!isCompact ? (
          <div className="flex h-full">
            {/* Left Panel */}
            <div className="border-default-200 w-16 flex-shrink-0 border-r pr-2">
              <Sidebar
                key={`left-panel-${isDarkMode ? 'dark' : 'light'}-${
                  isMoreMenuOpen
                }`}
                selectedKey={selectedKey}
                items={sidebarItemsToRender}
                isCompact={true}
                hideEndContent={true}
                classNames={{ base: 'gap-2' }}
                itemClasses={{
                  base: ({ isSelected }: any) =>
                    getSidebarMenuItemBaseClass({
                      isSelected,
                      isDarkMode
                    }),
                  title: getSidebarMenuTitleClass({ textColorClass })
                }}
                onSelect={key => {
                  if (key === 'more-button') {
                    setIsMoreMenuOpen(true)
                  } else {
                    const item = items.find(i => i.key === key)
                    if (item) {
                      const isSameParent = selectedParentMenu?.key === key

                      // 🚀 Prevent navigation if showInMainContent is false
                      if (item.showInMainContent === false) {
                        // Open right panel
                        if (item.items?.length) {
                          onNestToggle?.(isSameParent ? '' : key)
                          setIsSubmenuOpen(true)
                        } else {
                          setIsSubmenuOpen(false)
                        }
                        onSelect?.(key)
                        return // Stop here, don't navigate
                      }

                      // Normal navigation flow
                      if (item.items?.length && key !== 'home') {
                        onNestToggle?.(isSameParent ? '' : key)
                        setIsSubmenuOpen(true)
                      } else {
                        onNestToggle?.('')
                        setIsSubmenuOpen(false)
                      }
                      onSelect?.(key)
                    }
                  }
                }}
                iconClassName={buttonTextColor}
                isDarkMode={isDarkMode}
              />
              {isMoreMenuOpen && (
                <div
                  className="hover:bg-default-50 flex cursor-pointer items-center justify-center rounded-lg p-2"
                  onClick={() => setIsMoreMenuOpen(false)}>
                  <Icon
                    icon="lucide:chevron-left"
                    className={`${buttonTextColor} h-5 w-5`}
                  />
                </div>
              )}
            </div>

            {/* Right Panel */}
            <div className="w-[200px] flex-shrink-0 overflow-y-auto pl-3">
              {renderRightPanel()}
            </div>
          </div>
        ) : (
          <Sidebar
            key={`compact-${isDarkMode ? 'dark' : 'light'}-sidebar`}
            selectedKey={selectedKey}
            items={sidebarItemsToRender}
            isCompact={isCompact}
            hideEndContent={isCompact}
            classNames={{ base: 'gap-2' }}
            itemClasses={{
              base: ({ isSelected }: any) =>
                getSidebarMenuItemBaseClass({
                  isSelected,
                  isDarkMode
                }),
              title: getSidebarMenuTitleClass({ textColorClass })
            }}
            expandedKeys={expandedKeys}
            onExpandedChange={onExpandedChange}
            onNestToggle={onNestToggle}
            onSelect={onSelect}
            iconClassName={buttonTextColor}
            isDarkMode={isDarkMode}
          />
        )}
      </ScrollShadow>
    </>
  )
}

export default SidebarMenu
