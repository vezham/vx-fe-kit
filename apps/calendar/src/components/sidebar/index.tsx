import { Icon } from '@iconify/react'
import {
  useMatchRoute,
  useNavigate,
  useRouterState
} from '@tanstack/react-router'
import React, { useState } from 'react'

import { Button, cn } from '@vezham/react/v2'

import type { SidebarProps } from './types'

const Sidebar: React.FC<SidebarProps> = ({ sidebar, children }) => {
  const navigate = useNavigate()
  const { location } = useRouterState()
  const matchRoute = useMatchRoute()
  const [collapsed, setCollapsed] = useState(true)

  return (
    <aside
      className={cn(
        'border-default-300 flex min-h-screen flex-col border-r p-4 transition-all duration-200',
        collapsed ? 'w-16' : 'w-72'
      )}>
      <div
        className={cn(
          'mb-4 flex px-2 pt-4',
          collapsed ? 'justify-center' : 'justify-end'
        )}>
        <Button
          isIconOnly
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="bg-default-300 hover:bg-default-400">
          <Icon
            icon={collapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'}
            width={16}
          />
        </Button>
      </div>

      {!collapsed && children && (
        <div className="flex-1 border-r">{children}</div>
      )}
    </aside>
  )
}

export default Sidebar
