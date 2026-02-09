import React from 'react'

import Menu from './index'
import type { MenuLayoutProps } from './types'

const PageLayout: React.FC<MenuLayoutProps> = ({ children, sidebar, menu }) => {
  return (
    <div className="flex gap-2">
      <Menu menu={menu} />

      <div className="flex-1">
        <div className="flex">
          {sidebar && (
            <div className="bg-warning grid h-screen w-64 items-center justify-center">
              {sidebar}
            </div>
          )}

          <div className="flex-1 p-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default PageLayout
