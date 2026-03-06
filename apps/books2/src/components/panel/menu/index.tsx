import { Icon } from '@iconify/react'
import { useNavigate } from '@tanstack/react-router'
import React from 'react'

import { ScrollShadow } from '@vezham/react/v3'

import { MenuProps } from './types'
import { sidebarStyles } from './variant'

const Menu: React.FC<MenuProps> = ({
  items,
  selectedKey,
  onSelect,
  iconClassName = sidebarStyles.icon.base
}) => {
  const navigate = useNavigate()

  const handleSelect = (key: string, href?: string) => {
    onSelect?.(key)
    if (href) navigate({ to: href })
  }

  return (
    <ScrollShadow
      className="flex-1 overflow-y-auto"
      hideScrollBar
      orientation="vertical">
      <div className="flex flex-col gap-6">
        {items.map(item => (
          <div
            key={item.key}
            onClick={() => handleSelect(item.key, item.href)}
            className="cursor-pointer">
            <div className="flex flex-col items-center">
              <Icon
                icon={item.icon || ''}
                width={24}
                className={`${iconClassName} ${
                  selectedKey === item.key ? sidebarStyles.icon.selected : ''
                }`}
              />
              <span className="text-medium w-full truncate text-center">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ScrollShadow>
  )
}

export { Menu }
