import React from 'react'

import Header from '../header'
import Menu from './index'
import type { MenuLayoutProps } from './types'

const PageLayout: React.FC<MenuLayoutProps> = ({
  children,
  sidebar,
  calendarMenu,
  header
}) => {
  return (
    <div className="flex gap-2">
      {calendarMenu}

      <div className="flex-1">
        <div className="flex">
          {sidebar && <div>{sidebar}</div>}

          <div className="flex-1">
            {header && <Header header={header} />}
            <div className="p-5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageLayout
