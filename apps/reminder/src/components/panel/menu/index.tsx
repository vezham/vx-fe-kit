import { Icon } from '@iconify/react'
import { useNavigate } from '@tanstack/react-router'
import React from 'react'

import { ScrollShadow, Separator, Surface } from '@vezham/react/v3'

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
    // <Surface
    //   variant="transparent"
    //   className={`${sidebarStyles.container} flex-1 flex-col items-center justify-center`}
    //   data-vx="menu">

    // </Surface>
    <ScrollShadow className="flex-1" hideScrollBar orientation="vertical">
      <div className="flex min-h-full flex-col">
        {items.map(item => (
          <div
            key={item.key}
            onClick={() => handleSelect(item.key, item.href)}
            className="cursor-pointer">
            <div className="flex flex-col items-center gap-1 py-2">
              <Icon
                icon={item.icon || ''}
                width={24}
                className={`${iconClassName} ${
                  selectedKey === item.key ? sidebarStyles.icon.selected : ''
                }`}
              />
              <span className="text-tiny w-full truncate text-center">
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
