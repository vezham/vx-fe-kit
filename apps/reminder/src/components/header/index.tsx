import { Icon } from '@iconify/react'
import { useMatchRoute, useNavigate, useSearch } from '@tanstack/react-router'
import React from 'react'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@vezham/react/v2'

import NewReminderDrawer from '../../pages/reminders/drawer'
import CreateListModal from '../../pages/reminders/modal'
import type { HeaderProps } from './types'

type SearchParams = {
  drawer?: 'reminder' | 'list'
  id?: string
}

const Header: React.FC<HeaderProps> = ({ header }) => {
  const navigate = useNavigate()
  const matchRoute = useMatchRoute()
  const search = useSearch({ strict: false }) as SearchParams

  if (!header || header.length === 0) return null

  const openReminderDrawer = () => {
    navigate({
      search: {
        drawer: 'reminder'
      }
    })
  }

  const openListModal = () => {
    navigate({
      search: {
        drawer: 'list'
      }
    })
  }

  const closeAll = () => {
    navigate({
      search: {}
    })
  }

  return (
    <div className="border-default-100 flex items-center justify-end gap-3 border-b px-6 py-4">
      <Dropdown>
        <DropdownTrigger>
          <Button size="sm" isIconOnly>
            <Icon icon="mdi:plus" width={22} />
          </Button>
        </DropdownTrigger>

        <DropdownMenu>
          <DropdownItem onClick={openListModal} key={''}>
            New List
          </DropdownItem>

          <DropdownItem onClick={openReminderDrawer} key={''}>
            New Reminder
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <div className="flex gap-3">
        {header.map(item => {
          const isActive = Boolean(matchRoute({ to: item.href, fuzzy: true }))

          return (
            <Button
              key={item.href}
              isIconOnly
              size="sm"
              variant="light"
              onClick={() => navigate({ to: item.href })}
              className={isActive ? 'bg-primary text-white' : ''}>
              <Icon icon={item.icon} width={20} />
            </Button>
          )
        })}
      </div>

      <CreateListModal isOpen={search.drawer === 'list'} onClose={closeAll} />

      <NewReminderDrawer
        isOpen={search.drawer === 'reminder'}
        reminderId={search.id}
        onClose={closeAll}
      />
    </div>
  )
}

export default Header
