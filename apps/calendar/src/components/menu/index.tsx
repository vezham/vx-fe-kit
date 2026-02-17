import { Icon } from '@iconify/react'
import React, { useState } from 'react'

import { Button, Checkbox, CheckboxGroup, cn } from '@vezham/react/v2'

import type { CalendarSidebarProps } from './types'

const Menu: React.FC<CalendarSidebarProps> = ({
  sections,
  selectedValues,
  onChange
}) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'bg-default-300 h-screen border-r px-2 transition-all duration-200',
        collapsed ? 'w-16' : 'w-64'
      )}>
      <div
        className={cn(
          'mb-4 flex',
          collapsed ? 'justify-center' : 'justify-end'
        )}>
        <Button
          isIconOnly
          variant="light"
          onClick={() => setCollapsed(!collapsed)}
          className={cn('hover:bg-default-100')}>
          {collapsed ? (
            <Icon icon="mdi:chevron-right" width={16} />
          ) : (
            <Icon icon="mdi:chevron-left" />
          )}
        </Button>
      </div>

      {!collapsed && sections && sections.length > 0 && (
        <div className="flex flex-col gap-6 p-4">
          {sections.map(section => (
            <div key={section.title} className="flex flex-col gap-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase">
                {section.title}
              </h4>

              <CheckboxGroup value={selectedValues} onValueChange={onChange}>
                {section.items.map(item => (
                  <Checkbox key={item.id} value={item.value}>
                    {item.label}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}

export default Menu
