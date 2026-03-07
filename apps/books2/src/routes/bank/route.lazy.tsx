import {
  Outlet,
  createLazyFileRoute,
  useNavigate,
  useParams,
  useRouterState
} from '@tanstack/react-router'
import { useState } from 'react'

import { Surface } from '@vezham/react/v3'

import { HeaderActions } from '../../components/actions'
import Sidebar from '../../components/sidebar'
import AppContainerHeader from '../../layouts/app-container-header'
import BankSidebar from '../../pages/banks/sidebar'

export const Route = createLazyFileRoute('/bank')({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()
  const { location } = useRouterState()
  const params = useParams({ strict: false })

  const accountsId = params?.accountsId

  /* Sidebar list state */
  const [ids, setIds] = useState<string[]>([])

  const currentIndex = ids.findIndex(i => i === accountsId)

  /* Detect account detail page */
  const isAccountPage = location.pathname.startsWith('/bank/accounts/')

  /* ---------------------- */
  /* Tabs */
  /* ---------------------- */

  const mainTabs = [
    { key: 'overview', title: 'Overview', href: '/bank/overview' },
    { key: 'accounts', title: 'Accounts', href: '/bank/accounts' }
  ]

  const accountTabs = [
    { key: 'overview', title: 'Overview' },
    { key: 'transactions', title: 'Transactions' },
    { key: 'reconcilation', title: 'Reconcilation' }
  ]

  const tabs = isAccountPage ? accountTabs : mainTabs

  const selected = isAccountPage
    ? (location.pathname.split('/').pop() ?? 'overview')
    : location.pathname.startsWith('/bank/accounts')
      ? 'accounts'
      : 'overview'

  const handleTabChange = (key: string) => {
    if (isAccountPage) {
      navigate({
        to: `/bank/accounts/$accountsId/${key}`,
        params: { accountsId }
      })
    } else {
      const tab = mainTabs.find(t => t.key === key)
      if (!tab) return

      navigate({ to: tab.href })
    }
  }

  /* ---------------------- */
  /* Prev / Next Navigation */
  /* ---------------------- */

  const goPrev = () => {
    if (currentIndex <= 0) return

    navigate({
      to: '/bank/accounts/$accountsId/overview',
      params: { accountsId: ids[currentIndex - 1] }
    })
  }

  const goNext = () => {
    if (currentIndex === ids.length - 1) return

    navigate({
      to: '/bank/accounts/$accountsId/overview',
      params: { accountsId: ids[currentIndex + 1] }
    })
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
        <div
          className={`w-full md:w-[320px] md:min-w-[320px] ${isAccountPage ? 'hidden md:block' : 'block'} `}>
          <Sidebar>
            <BankSidebar
              onDataChange={setIds}
              onItemClick={id =>
                navigate({
                  to: '/bank/accounts/$accountsId/overview',
                  params: { accountsId: id }
                })
              }
            />
          </Sidebar>
        </div>

        <div
          className={`flex w-full flex-1 flex-col overflow-hidden ${!isAccountPage ? 'hidden md:flex' : 'flex'} `}>
          {isAccountPage && (
            <HeaderActions
              showBack
              showClose
              currentIndex={currentIndex}
              total={ids.length}
              onPrev={goPrev}
              onNext={goNext}
              onBack={() => navigate({ to: '/bank/accounts' })}
              onClose={() => navigate({ to: '/bank/accounts' })}
              actions={[
                {
                  key: 'more',
                  icon: 'mdi:dots-vertical'
                }
              ]}
            />
          )}

          <Surface className="flex-1 overflow-auto">
            <Outlet />
          </Surface>
        </div>
      </div>
    </div>
  )
}
