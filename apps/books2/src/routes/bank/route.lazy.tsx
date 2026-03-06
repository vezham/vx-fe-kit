import {
  Outlet,
  createLazyFileRoute,
  useNavigate,
  useRouterState
} from '@tanstack/react-router'
import React from 'react'

import { Surface } from '@vezham/react/v3'

import Sidebar from '../../components/sidebar'
import AppContainerHeader from '../../layouts/app-container-header'
import BankSidebar from '../../pages/banks/sidebar'

export const Route = createLazyFileRoute('/bank')({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()
  const { location } = useRouterState()

  const tabs = [
    { key: 'overview', title: 'Overview', href: '/bank/overview' },
    { key: 'accounts', title: 'Accounts', href: '/bank/accounts' }
  ]

  const selected = location.pathname.startsWith('/bank/accounts')
    ? 'accounts'
    : 'overview'

  const handleTabChange = (key: string) => {
    const tab = tabs.find(t => t.key === key)
    if (!tab) return

    navigate({ to: tab.href })
  }

  return (
    <div className="flex h-screen w-full flex-col p-4">
      <Surface variant="transparent" className="p-5">
        <AppContainerHeader
          tabs={tabs}
          selectedKey={selected}
          onTabChange={handleTabChange}
          onAdd={() => console.log('add')}
        />
      </Surface>

      <div className="flex flex-1 gap-4 overflow-hidden">
        <Sidebar>
          <BankSidebar
            onItemClick={id =>
              navigate({
                to: '/bank/accounts/$accountsId/overview',
                params: { accountsId: id }
              })
            }
          />
        </Sidebar>

        <Surface className="flex-1 overflow-auto">
          <Outlet />
        </Surface>
      </div>
    </div>
  )
}

// import { createLazyFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
// import Sidebar from '../../components/sidebar'
// import BankSidebar from '../../pages/banks/sidebar'
// import { Surface } from '@vezham/react/v3'

// export const Route = createLazyFileRoute('/bank')({
//     component: RouteComponent,
// })

// function RouteComponent() {
//     const navigate = useNavigate()

//     return (
//         <div className="flex h-screen w-full p-4 gap-4">
//             <Sidebar>
//                 <BankSidebar
//                     onItemClick={(id) =>
//                         navigate({
//                             to: '/bank/accounts/$accountsId/overview',
//                             params: { accountsId: id },
//                         })
//                     }
//                 />
//             </Sidebar>

//             <Surface className="flex-1 overflow-hidden">
//                 <Outlet />
//             </Surface>
//         </div>
//     )
// }
