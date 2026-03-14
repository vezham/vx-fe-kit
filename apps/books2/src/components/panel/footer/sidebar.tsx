'use client'

import { Icon } from '@iconify/react'
import { useState } from 'react'

import { ScrollShadow } from '@vezham/react/v3'

import { SidebarItem, settingsSidebar } from './data'

type Props = {
  onSelect?: (id: string) => void
}

export default function SettingsSidebar({ onSelect }: Props) {
  const [active, setActive] = useState('account')
  const [openGroups, setOpenGroups] = useState<string[]>([])

  const toggleGroup = (id: string) => {
    setOpenGroups(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleSelect = (id: string) => {
    setActive(id)
    onSelect?.(id)
  }

  const renderItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isOpen = openGroups.includes(item.id)

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) toggleGroup(item.id)
            else handleSelect(item.id)
          }}
          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
            active === item.id
              ? 'bg-default-100 font-medium'
              : 'hover:bg-default-50'
          }`}
          style={{ paddingLeft: 12 + level * 16 }}>
          <div className="flex items-center gap-2">
            {item.icon && <Icon icon={item.icon} width={18} />}
            {item.label}
          </div>

          {hasChildren && (
            <Icon
              icon={
                isOpen
                  ? 'solar:alt-arrow-down-linear'
                  : 'solar:alt-arrow-right-linear'
              }
              width={16}
            />
          )}
        </button>

        {hasChildren && isOpen && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <ScrollShadow className="w-[240px] pr-2">
      <div className="space-y-6">
        {settingsSidebar.map(section => (
          <div key={section.title}>
            <p className="text-default-500 mb-2 px-3 text-xs font-semibold">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map(item => renderItem(item))}
            </div>
          </div>
        ))}
      </div>
    </ScrollShadow>
  )
}
