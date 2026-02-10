import { useNavigate, useRouterState } from '@tanstack/react-router'
import React from 'react'

import { Button, cn } from '@vezham/react/v2'

import type { SidebarProps } from './types'

const Sidebar: React.FC<SidebarProps> = ({ sidebar, children }) => {
  const navigate = useNavigate()
  const { location } = useRouterState()

  return (
    <aside className="bg-default h-screen w-64 border-r px-3 py-4">
      {sidebar && sidebar.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {sidebar.map(item => {
            const isActive = location.pathname === item.href

            return (
              <Button
                key={item.href}
                onClick={() => navigate({ to: item.href })}
                className={cn(
                  'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm',
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-default-700 hover:bg-default-100 border-primary-200 border'
                )}>
                <span>{item.label}</span>

                {item.count !== undefined && (
                  <span className="text-xs opacity-70">{item.count}</span>
                )}
              </Button>
            )
          })}
        </div>
      ) : (
        children
      )}
    </aside>
  )
}

export default Sidebar
