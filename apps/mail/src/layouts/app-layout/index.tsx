import React from 'react'

import Menu from './index'
import { AppLayoutProps } from './types'

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  sidebar,
  header,
  menu
}) => {
  return (
    <div className="flex gap-2">
      {menu && <Menu menu={menu} />}
      <div className="flex-1">
        <div className="flex w-screen gap-2">
          {sidebar && <div>{sidebar}</div>}
          <div className="flex h-screen w-full flex-col overflow-y-auto">
            <div>{header && <div>{header}</div>}</div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
