import { Icon } from '@iconify/react'
import { useMatchRoute, useNavigate } from '@tanstack/react-router'
import React, { useState } from 'react'

import { Button } from '@vezham/react/v2'

import NoteModal from '../../pages/notes/createmodal'
import type { HeaderProps } from './types'

const Header: React.FC<HeaderProps> = ({ header }) => {
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()
  const matchRoute = useMatchRoute()

  if (!header || header.length === 0) return null

  return (
    <div className="border-default-100 flex items-center justify-end gap-3 border-b px-6 py-4">
      <Button size="sm" isIconOnly onPress={() => setOpen(true)}>
        <Icon icon="mdi:plus" width={22} />
      </Button>
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
      <NoteModal isOpen={open} onOpenChange={setOpen} />
    </div>
  )
}

export default Header
