import { useNavigate } from '@tanstack/react-router'
import React from 'react'

import { Button } from '@vezham/react/v2'

import type { MenuProps } from './types'

const Menu: React.FC<MenuProps> = ({ menu }) => {
  const navigate = useNavigate()
  return (
    <div className="bg-default flex h-screen w-48 flex-col gap-3 py-6">
      {menu?.map(item => (
        <Button
          key={item.href}
          className="cursor-pointer"
          onPress={() => navigate({ to: item.href })}>
          {item.label}
        </Button>
      ))}
    </div>
  )
}

export default Menu
