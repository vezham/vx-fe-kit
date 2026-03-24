'use client'

import { Icon } from '@iconify/react'
import { useState } from 'react'

import { Button, Surface } from '@vezham/react/v3'

import SettingsSidebar, { findItemById } from './sidebar'

export type User = {
  name?: string
  avatarUrl?: string
}

export default function UserInfoModal({ open, onClose, user }: any) {
  const [active, setActive] = useState('account')

  if (!open) return null

  const item = findItemById(active)
  const Component = item?.component

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}>
      <Surface
        className="relative flex h-[500px] w-[700px] rounded-2xl p-6"
        onClick={e => e.stopPropagation()}>
        <Button
          isIconOnly
          variant="ghost"
          className="absolute top-4 right-4"
          onPress={onClose}>
          <Icon icon="solar:close-circle-linear" width={22} />
        </Button>

        <SettingsSidebar active={active} onSelect={setActive} user={user} />

        <div className="flex-1 overflow-auto p-6">
          {Component ? <Component /> : <div>Select a setting</div>}
        </div>
      </Surface>
    </div>
  )
}
