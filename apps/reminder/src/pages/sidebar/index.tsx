import { useNavigate } from '@tanstack/react-router'
import React from 'react'

import { Link } from '@vezham/react/v2'

import type { SidebarProps } from './types'

const Sidebar: React.FC<SidebarProps> = ({ sidebar, children }) => {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 py-4">
      {sidebar && sidebar.length > 0
        ? sidebar.map(item => (
            <Link
              color="foreground"
              key={item.href}
              className="cursor-pointer"
              onClick={() => navigate({ to: item.href })}>
              {item.label}
            </Link>
          ))
        : children}
    </div>
  )
}

export default Sidebar
