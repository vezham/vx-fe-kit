import {
  Outlet,
  createLazyFileRoute,
  useNavigate,
  useRouterState
} from '@tanstack/react-router'

import { Surface } from '@vezham/react/v3'

import Sidebar from '../../components/sidebar'
import AppContainerHeader from '../../layouts/app-container-header'
import BookSidebar from '../../pages/books/sidebar'

export const Route = createLazyFileRoute('/books')({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()
  const { location } = useRouterState()

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

  return (
    <Surface
      variant="secondary"
      className="flex h-screen w-full flex-col overflow-hidden p-4">
      <div className="p-5">
        <AppContainerHeader
          tabs={tabs}
          selectedKey={selected}
          onTabChange={handleTabChange}
          onAdd={() => console.log('add')}
        />
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Sidebar */}
        <Sidebar>
          <BookSidebar
            onItemClick={id =>
              navigate({
                to: '/books/accounts/$accountsId/overview',
                params: { accountsId: id }
              })
            }
          />
        </Sidebar>

        {/* Content */}
        <Surface className="min-w-0 flex-1 overflow-auto">
          <Outlet />
        </Surface>
      </div>
    </Surface>
  )
}
