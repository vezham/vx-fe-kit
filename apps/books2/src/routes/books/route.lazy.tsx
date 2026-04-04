import {
  Outlet,
  createLazyFileRoute,
  useNavigate,
  useRouterState
} from '@tanstack/react-router'
import { useState } from 'react'

import { Surface } from '@vezham/react/v3'

import { HeaderActions } from '../../components/actions'
import {Sidebar} from '../../components/sidebar'
import AppContainerHeader from '../../layouts/app-container-header'
import BookSidebar from '../../pages/books/sidebar'

export const Route = createLazyFileRoute('/books')({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()
  const { location } = useRouterState()

  const [showSidebarMobile, setShowSidebarMobile] = useState(true)

  const tabs = [
    { key: 'overview', title: 'Overview', href: '/books/overview' },
    { key: 'sales', title: 'Sales', href: '/books/sales' },
    { key: 'purchase', title: 'Purchase', href: '/books/purchase' }
  ]

  const selected = location.pathname.startsWith('/books/sales')
    ? 'sales'
    : location.pathname.startsWith('/books/purchase')
      ? 'purchase'
      : 'overview'

  const handleTabChange = (key: string) => {
    const tab = tabs.find(t => t.key === key)
    if (!tab) return
    navigate({ to: tab.href })
  }

  const goBack = () => {
    setShowSidebarMobile(true)
  }

  const goClose = () => {
    navigate({ to: '/books' })
  }

  return (
    <Surface className="bg-background flex h-screen w-full min-w-0 flex-col p-4">
      <Surface variant="transparent" className="p-3">
        <AppContainerHeader
          tabs={tabs}
          selectedKey={selected}
          onTabChange={handleTabChange}
          onAdd={() => console.log('add')}
        />
      </Surface>
      <div className="flex flex-1 gap-4 overflow-hidden">
        <div
          className={`w-full min-w-0 md:w-[320px] md:min-w-[320px] ${showSidebarMobile ? 'block' : 'hidden'} md:block`}>
          <Sidebar>
            <BookSidebar
              onItemClick={() => {
                setShowSidebarMobile(false)
              }}
            />
          </Sidebar>
        </div>
        <div
          className={`flex min-w-0 flex-1 flex-col overflow-hidden ${showSidebarMobile ? 'hidden md:flex' : 'flex'}`}>
          <HeaderActions
            showBack
            showClose
            onBack={goBack}
            onClose={goClose}
            actions={[
              {
                key: 'more',
                icon: 'mdi:dots-vertical'
              }
            ]}
          />
          <Surface className="flex-1 overflow-auto rounded-xl p-4">
            <Outlet />
          </Surface>
        </div>
      </div>
    </Surface>
  )
}
