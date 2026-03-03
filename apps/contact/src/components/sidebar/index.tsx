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
  const [collapsed, setCollapsed] = useState(true)
  const { groups } = useContacts()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <aside className="flex min-h-screen">
      <div
        className={cn(
          'border-default-300 flex flex-col gap-3 border-r px-3 py-4 transition-all duration-200',
          collapsed ? 'w-16' : 'w-48 md:w-72'
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

        {!collapsed && children && (
          <div className="flex-1 border-r">{children}</div>
        )}
      </div>

      <CreateGroupModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </aside>
  )
}

export default Sidebar
