import {
  Outlet,
  createLazyFileRoute,
  useNavigate,
  useRouterState
} from '@tanstack/react-router'

import { Surface } from '@vezham/react/v3'

import AppContainerHeader from '../../../layouts/app-container-header'

export const Route = createLazyFileRoute('/reports/purchase/')({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()
  const { location } = useRouterState()

  const tabs = [
    {
      key: 'purchasereport',
      title: 'Purchase Report',
      href: '/reports/purchase/purchase_reports'
    },
    {
      key: 'supplierreport',
      title: 'Supplier Report',
      href: '/reports/purchase/supplier_reports'
    },
    {
      key: 'purchaserreport',
      title: 'Purchaser Report',
      href: '/reports/purchase/purchaser_reports'
    },
    {
      key: 'itemwisereport',
      title: 'Itemwise Report',
      href: '/reports/purchase/itemwise_reports'
    }
  ]

  const selected = location.pathname.startsWith(
    '/reports/purchase/purchase_reports'
  )
    ? 'purchasereport'
    : location.pathname.startsWith('/reports/purchase/supplier_reports')
      ? 'supplierreport'
      : location.pathname.startsWith('/reports/purchase/purchaser_reports')
        ? 'purchasereport'
        : 'itemwisereport'

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
        />
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        <Surface className="min-w-0 flex-1 overflow-auto">
          <Outlet />
        </Surface>
      </div>
    </Surface>
  )
}
