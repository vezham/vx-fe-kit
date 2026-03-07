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

  const params = useParams({ strict: false })

  const accountsId = params?.accountsId

  const [ids, setIds] = useState<string[]>([])

  const currentIndex = ids.findIndex(i => i === accountsId)

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

  const goBack = () => {
    setShowSidebarMobile(true)
  }

  const goClose = () => {
    navigate({ to: '/books' })
  }

  return (
    <Surface variant="secondary" className="flex h-screen w-full flex-col p-4">
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
          className={`w-full md:w-[320px] md:min-w-[320px] ${showSidebarMobile ? 'block' : 'hidden'} md:block`}>
          <Sidebar>
            <BookSidebar
              onItemClick={() => {
                setShowSidebarMobile(false)
              }}
            />
          </Sidebar>
        </div>
        <div
          className={`flex w-full flex-1 flex-col overflow-hidden ${showSidebarMobile ? 'hidden md:flex' : 'flex'} `}>
          <HeaderActions
            showBack
            showClose
            currentIndex={currentIndex}
            total={ids.length}
            onPrev={goPrev}
            onNext={goNext}
            onBack={goBack}
            onClose={goClose}
            actions={[
              {
                key: 'more',
                icon: 'mdi:dots-vertical'
              }
            ]}
          />
          <Surface className="flex-1 overflow-auto">
            <Outlet />
          </Surface>
        </div>
      </div>
    </Surface>
  )
}
