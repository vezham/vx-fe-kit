import { Input, ScrollShadow } from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'

import Sidebar from './sidebar'
import { SidebarMenuProps } from './types'

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

      <ScrollShadow
        className={getScrollShadowClassName({ scrollShadowBg, isCompact })}>
        {!isCompact ? (
          <Sidebar
            key={`expanded-${isDarkMode ? 'dark' : 'light'}-sidebar`}
            selectedKey={selectedKey}
            items={items}
            isCompact={false}
            hideEndContent={false}
            classNames={{ base: 'gap-2' }}
            itemClasses={{
              base: ({ isSelected }: any) =>
                getSidebarMenuItemBaseClass({ isSelected, isDarkMode }),
              title: getSidebarMenuTitleClass({ textColorClass })
            }}
            expandedKeys={expandedKeys}
            onExpandedChange={onExpandedChange}
            onNestToggle={onNestToggle}
            onSelect={onSelect}
            iconClassName={buttonTextColor}
            isDarkMode={isDarkMode}
          />
        ) : (
          <Sidebar
            key={`compact-${isDarkMode ? 'dark' : 'light'}-sidebar`}
            selectedKey={selectedKey}
            items={items}
            isCompact={isCompact}
            hideEndContent={isCompact}
            classNames={{ base: 'gap-2' }}
            itemClasses={{
              base: ({ isSelected }: any) =>
                getSidebarMenuItemBaseClass({ isSelected, isDarkMode }),
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
