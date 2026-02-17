import React from 'react'

import Menu from './layout'
import { MenuLayoutProps } from './types'

const PageLayout: React.FC<MenuLayoutProps> = ({ children, sidebar, menu }) => {
  return (
    <div className="flex min-h-screen gap-2">
      {menu && <Menu menu={menu} />}

      <div className="flex flex-1">
        {sidebar && <div>{sidebar}</div>}

        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  )
}

export default PageLayout
