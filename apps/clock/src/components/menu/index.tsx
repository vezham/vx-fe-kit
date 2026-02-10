import { useNavigate } from '@tanstack/react-router'
import React from 'react'

import { Link } from '@vezham/react/v2'

import type { MenuProps } from './types'

const Menu: React.FC<MenuProps> = ({ menu }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-default flex h-screen w-36 flex-col items-center justify-center gap-3 py-4">
      {menu?.map(item => (
        <Link
          key={item.href}
          className="cursor-pointer"
          onClick={() => navigate({ to: item.href })}>
          {item.label}
        </Link>
      ))}
    </div>
  )
}

export default Menu
