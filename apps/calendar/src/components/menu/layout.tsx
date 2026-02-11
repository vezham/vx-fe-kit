import React from 'react'

import Menu from './index'
import type { MenuLayoutProps } from './types'

const PageLayout: React.FC<MenuLayoutProps> = ({ children, sidebar, menu }) => {
  return (
    <div className="flex gap-2">
      <Menu menu={menu} />

      <div className="flex-1">
        <div className="flex">
          {sidebar && <div>{sidebar}</div>}

          <div className="flex-1 p-6">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default PageLayout
