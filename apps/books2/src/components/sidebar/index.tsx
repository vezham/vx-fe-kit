import { Icon } from '@iconify/react'
import React from 'react'

import type { SidebarProps } from './types'

const Sidebar: React.FC<SidebarProps> = ({ sidebar, children }) => {
  return (
    <aside className="min-h-screen">
      <div>
        <div className="md:border-default-300 w-full flex-1 p-4 md:w-72 md:border-r">
          {children}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
