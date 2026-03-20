'use client'

import { Icon } from '@iconify/react'

import { Button, Surface } from '@vezham/react/v3'

import SettingsSidebar from './sidebar'

type Props = {
  open: boolean
  onClose: () => void
}

export default function UserInfoModal({ open, onClose }: Props) {
  if (!open) return null

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

        <SettingsSidebar />

        <div className="flex-1 p-6">Content here</div>
      </Surface>
    </div>
  )
}
