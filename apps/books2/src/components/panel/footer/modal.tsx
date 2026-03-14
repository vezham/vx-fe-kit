'use client'

import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import { Surface } from '@vezham/react/v3'

import SettingsSidebar from './sidebar'

type Props = {
  open: boolean
  onClose: () => void
}

export default function UserInfoModal({ open, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Surface className="flex w-[700px] rounded-2xl p-6">
        {/* <SettingsSidebar /> */}

        <div className="flex-1 p-6">Content here</div>
      </Surface>
    </div>
  )
}
