import { Icon } from '@iconify/react'
import { useNavigate } from '@tanstack/react-router'
import React from 'react'

import {
  Input,
  Kbd,
  Listbox,
  ListboxItem,
  ScrollShadow,
  Tooltip
} from '@vezham/react/v2'

import { useTheme } from '../../../common/context'
import { SidebarItem, SidebarProps } from './types'
import {
  getInputWrapperClass,
  getSearchIconClass,
  sidebarStyles
} from './variant'

const Sidebar: React.FC<SidebarProps> = ({
  items,
  selectedKey,
  onSelect,
  isCompact = false,
  hideEndContent = false,
  iconClassName = sidebarStyles.icon.base
}) => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = React.useState('')
  const { isDarkMode } = useTheme()

  const handleSelect = (key: string, href?: string) => {
    if (onSelect) onSelect(key)
    if (href) navigate({ to: href })
  }

  const renderItem = (item: SidebarItem) => {
    const iconEl = (
      <Icon
        icon={item.icon || ''}
        width={24}
        className={`${iconClassName} ${
          selectedKey === item.key ? sidebarStyles.icon.selected : ''
        }`}
      />
    )

    if (isCompact) {
      return (
        <div
          key={item.key}
          onClick={() => handleSelect(item.key, item.href)}
          className={`${sidebarStyles.compactItem.base} ${
            selectedKey === item.key ? sidebarStyles.compactItem.selected : ''
          }`}>
          <Tooltip content={item.title} placement="right">
            <div className="flex flex-col items-center gap-1 py-2">
              {iconEl}
              <span className="text-tiny w-full truncate text-center">
                {item.title}
              </span>
            </div>
          </Tooltip>
        </div>
      )
    }

    return (
      <ListboxItem
        key={item.key}
        title={item.title}
        textValue={item.title}
        className={`${sidebarStyles.listboxItem.base} ${
          selectedKey === item.key ? sidebarStyles.listboxItem.selected : ''
        }`}
        onClick={() => handleSelect(item.key, item.href)}
        startContent={iconEl}
        endContent={hideEndContent ? null : item.endContent}>
        {item.title}
      </ListboxItem>
    )
  }

  // filter items based on search
  const filteredItems = React.useMemo(() => {
    if (!searchValue.trim()) return items
    const query = searchValue.toLowerCase()
    return items.filter(item => item.title.toLowerCase().includes(query))
  }, [items, searchValue])

  return (
    <div className={`${sidebarStyles.container} flex h-full flex-col`}>
      {/* Search Box */}
      <div className="cursor-pointer">
        <Input
          size="sm"
          fullWidth={!isCompact}
          aria-label="search"
          value={searchValue}
          placeholder={isCompact ? '' : 'Search or Jump to... (⌘K)'}
          className="mb-2 px-3"
          classNames={{
            input: isCompact ? 'hidden' : 'block',
            inputWrapper: getInputWrapperClass({ isDarkMode, isCompact })
          }}
          startContent={
            <Icon
              icon="lucide:search"
              width={20}
              className={getSearchIconClass({ isDarkMode })}
            />
          }
          endContent={
            !isCompact && <Kbd className="hidden sm:inline-block">⌘K</Kbd>
          }
          readOnly
        />
      </div>

      <ScrollShadow hideScrollBar orientation="vertical">
        {isCompact ? (
          <div className="flex flex-col">{filteredItems.map(renderItem)}</div>
        ) : (
          <Listbox
            aria-label="Main menu"
            selectionMode="single"
            selectedKeys={selectedKey ? new Set([selectedKey]) : new Set()}
            onSelectionChange={keys => {
              if (keys !== 'all') {
                const key = Array.from(keys)[0]
                const found = items.find(i => i.key === key)
                if (found) handleSelect(found.key, found.href)
              }
            }}>
            {filteredItems.map(renderItem)}
          </Listbox>
        )}
      </ScrollShadow>
    </div>
  )
}

export default Sidebar
