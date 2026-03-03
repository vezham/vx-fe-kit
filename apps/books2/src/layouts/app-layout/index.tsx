// import { useMatchRoute, useRouterState } from '@tanstack/react-router'
// import React, { useState } from 'react'
// import { Surface } from '@vezham/react/v3'
// import Sidebar from '../../components/sidebar'
// import MenuLayout from '../menu-layout'
// import MailSidebar from '../../pages/reports/sidebar'
// const AppLayout = ({ children }: { children: React.ReactNode }) => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false)
//   const matchRoute = useMatchRoute()
//   const { location } = useRouterState()
//   const isSettings = matchRoute({ to: '/settings', fuzzy: true })
//   const isNotifications = matchRoute({ to: '/notifications', fuzzy: true })
//   const isCTA = matchRoute({ to: '/cta/help-support', fuzzy: true })
//   const hideChild = isSettings || isNotifications || isCTA
//   let sidebarChild = null
//   if (!hideChild) {
//     if (location.pathname === '/reports') {
//       sidebarChild = <MailSidebar />
//     }
//   }
//   return (
//     <Surface variant="tertiary" data-vx="app-layout" className="w-full md:flex">
//       <MenuLayout />
//       <div className="flex w-full">
//         <div>
//         {sidebarChild &&
//           <Sidebar>{sidebarChild}</Sidebar>
//         }
//         </div>
//         <div className="flex flex-1 flex-col">
//           <div className="min-h-screen">
//             {children}
//           </div>
//         </div>
//       </div>
//     </Surface>
//   )
// }
// export { AppLayout }
import { useMatchRoute, useRouterState } from '@tanstack/react-router'
import React, { useState } from 'react'

import { Surface } from '@vezham/react/v3'

import Sidebar from '../../components/sidebar'
import MailSidebar from '../../pages/reports/sidebar'
import MenuLayout from '../menu-layout'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [showSidebarMobile, setShowSidebarMobile] = useState(true)

  const matchRoute = useMatchRoute()
  const { location } = useRouterState()

  const isSettings = matchRoute({ to: '/settings', fuzzy: true })
  const isNotifications = matchRoute({ to: '/notifications', fuzzy: true })
  const isCTA = matchRoute({ to: '/cta/help-support', fuzzy: true })

  const hideChild = isSettings || isNotifications || isCTA

  let sidebarChild = null

  if (!hideChild && location.pathname === '/reports') {
    sidebarChild = (
      <MailSidebar onItemClick={() => setShowSidebarMobile(false)} />
    )
  }

  return (
    <Surface variant="tertiary" data-vx="app-layout" className="w-full md:flex">
      <MenuLayout />
      <div className="hidden w-full md:flex">
        {sidebarChild && <Sidebar>{sidebarChild}</Sidebar>}

        <div className="flex flex-1 flex-col">
          <div className="min-h-screen">{children}</div>
        </div>
      </div>
      <div className="w-full md:hidden">
        {sidebarChild ? (
          showSidebarMobile ? (
            <Sidebar>{sidebarChild}</Sidebar>
          ) : (
            <div className="flex flex-col">
              <div className="bg-content2 border-b p-4">
                <button
                  onClick={() => setShowSidebarMobile(true)}
                  className="text-primary text-sm font-medium">
                  ← Back
                </button>
              </div>
              <div className="min-h-screen">{children}</div>
            </div>
          )
        ) : (
          <div className="min-h-screen">{children}</div>
        )}
      </div>
    </Surface>
  )
}

export { AppLayout }
