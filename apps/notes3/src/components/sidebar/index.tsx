import { Icon } from '@iconify/react'
import { useNavigate, useRouterState } from '@tanstack/react-router'
import React, { useState } from 'react'

import { Button, cn } from '@vezham/react/v2'

import { SidebarProps } from './types'

const Sidebar: React.FC<SidebarProps> = ({ sidebar, children }) => {
  const navigate = useNavigate()
  const { location } = useRouterState()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'bg-default-200 h-screen border-r px-2 py-4 transition-all duration-200',
        collapsed ? 'w-16' : 'w-64'
      )}>
      <div
        className={cn(
          'mb-4 flex',
          collapsed ? 'justify-center' : 'justify-end'
        )}>
        <Button
          isIconOnly
          onClick={() => setCollapsed(!collapsed)}
          className={cn('hover:bg-default-100')}>
          {collapsed ? (
            <Icon icon="mdi:chevron-right" width={16} />
          ) : (
            <Icon icon="mdi:chevron-left" />
          )}
        </Button>
      </div>

      {!collapsed && sidebar && sidebar.length > 0 && (
        <>
          <div className="flex flex-col gap-3 px-2">
            {sidebar.map(item => {
              const isActive = location.pathname === item.href

              return (
                <Button
                  variant="light"
                  key={item.href}
                  onClick={() => navigate({ to: item.href })}
                  className={cn(
                    'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-all',
                    isActive
                      ? 'bg-primary text-white'
                      : 'hover:bg-default-100 border-primary-200 border'
                  )}>
                  <span>{item.label}</span>

                  {item.count !== undefined && (
                    <span className="text-xs opacity-70">{item.count}</span>
                  )}
                </Button>
              )
            })}
          </div>
          <div>
            {children && (
              <div className="px-2 py-2">
                <div className="grid gap-4">{children}</div>
              </div>
            )}
          </div>
        </>
      )}
    </aside>
  )
}

export default Sidebar
