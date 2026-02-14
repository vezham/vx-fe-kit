import { Icon } from '@iconify/react'
import {
  useMatchRoute,
  useNavigate,
  useRouterState
} from '@tanstack/react-router'
import React, { useState } from 'react'

import { Button, cn } from '@vezham/react/v2'
import { useDisclosure } from '@vezham/react/v2'

import { useContacts } from '../../pages/contact/data'
import CreateGroupModal from '../../pages/groups/modal'
import type { SidebarProps } from './types'

const Sidebar: React.FC<SidebarProps> = ({ sidebar, children }) => {
  const navigate = useNavigate()
  const { location } = useRouterState()
  const matchRoute = useMatchRoute()
  const [collapsed, setCollapsed] = useState(false)
  const { groups } = useContacts()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  if (!sidebar || sidebar.length === 0) return null

  return (
    <aside className="flex h-screen">
      <div
        className={cn(
          'bg-default flex flex-col gap-3 border-r px-3 py-4 transition-all duration-200',
          collapsed ? 'w-16' : 'w-64'
        )}>
        <div
          className={cn(
            'mb-4 flex',
            collapsed ? 'justify-center' : 'justify-end'
          )}>
          <Button
            isIconOnly
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-default-300 bg-default-200">
            <Icon
              icon={collapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'}
              width={16}
            />
          </Button>
        </div>

        {!collapsed &&
          sidebar.map(item => {
            const isActive = Boolean(matchRoute({ to: item.href, fuzzy: true }))
            const isGroups = item.href === '/groups'

            return (
              <Button
                key={item.href}
                onClick={() => navigate({ to: item.href })}
                className={cn(
                  'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm',
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-default-700 hover:bg-default-100 border'
                )}>
                <span>{item.label}</span>

                {isGroups && isActive && (
                  <Icon
                    icon="mdi:plus"
                    width={18}
                    className="cursor-pointer"
                    onClick={e => {
                      e.stopPropagation()
                      onOpen()
                    }}
                  />
                )}

                {item.count !== undefined && !isGroups && (
                  <span className="text-xs opacity-70">{item.count}</span>
                )}
              </Button>
            )
          })}
      </div>

      {!collapsed && children && (
        <div className="bg-default-400 h-screen w-64 flex-1 border-r px-3 py-4">
          {children}
        </div>
      )}

      <CreateGroupModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </aside>
  )
}

export default Sidebar
