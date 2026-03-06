import {
  Outlet,
  createLazyFileRoute,
  useNavigate,
  useRouterState
} from '@tanstack/react-router'

import { Surface } from '@vezham/react/v3'

import AppContainerHeader from '../../../layouts/app-container-header'

export const Route = createLazyFileRoute('/reports/inventory/')({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()
  const { location } = useRouterState()

  const tabs = [
    {
      key: 'itemwisereport',
      title: 'Itemwise Report',
      to: '/reports/inventory/itemwise_report'
    },
    {
      key: 'itempurchasereport',
      title: 'ItemPurchase Report',
      to: '/reports/inventory/itempurchase_report'
    },
    {
      key: 'itemssoldreport',
      title: 'ItemsSold Report',
      to: '/reports/inventory/itemssold_report'
    }
  ]

  const selected = location.pathname.includes('itemwise_report')
    ? 'itemwisereport'
    : location.pathname.includes('itempurchase_report')
      ? 'itempurchasereport'
      : location.pathname.includes('itemssold_report')
        ? 'itemssoldreport'
        : 'itemwisereport'

  const handleTabChange = (key: string) => {
    const tab = tabs.find(t => t.key === key)
    if (!tab) return

    navigate({ to: tab.to })
  }

  return (
    <Surface
      variant="secondary"
      className="flex h-screen w-full flex-col overflow-hidden p-4">
      {/* HEADER */}
      <div className="p-5">
        <AppContainerHeader
          tabs={tabs}
          selectedKey={selected}
          onTabChange={handleTabChange}
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        <Surface className="min-w-0 flex-1 overflow-auto">
          <Outlet />
        </Surface>
      </div>
    </Surface>
  )
}
