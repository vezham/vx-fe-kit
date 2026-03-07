import { Icon } from '@iconify/react'
import React from 'react'

import type { SidebarProps } from './types'

const Sidebar: React.FC<SidebarProps> = ({ sidebar, children }) => {
  return (
    <aside>
      <div>
        <div className="w-full flex-1">{children}</div>
      </div>
    </aside>
  )
}

export default Sidebar
