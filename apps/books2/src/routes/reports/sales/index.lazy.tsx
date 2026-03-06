import {
  Outlet,
  createLazyFileRoute,
  useNavigate,
  useRouterState
} from '@tanstack/react-router'

import { Surface } from '@vezham/react/v3'

import AppContainerHeader from '../../../layouts/app-container-header'

export const Route = createLazyFileRoute('/reports/sales/')({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()
  const { location } = useRouterState()

  const tabs = [
    {
      key: 'salesregister',
      title: 'Sales Register',
      href: '/reports/sales/sales_register'
    },
    {
      key: 'customerreport',
      title: 'Customer Report',
      href: '/reports/sales/customer_report'
    },
    {
      key: 'salesreport',
      title: 'SalesPerson Report',
      href: '/reports/sales/sales_report'
    },
    {
      key: 'itemwisereport',
      title: 'Itemwise Report',
      href: '/reports/sales/itemwise_report'
    }
  ]

  const selected = location.pathname.startsWith('/reports/sales/sales_register')
    ? 'salesregister'
    : location.pathname.startsWith('/reports/sales/customer_report')
      ? 'customerreport'
      : location.pathname.startsWith('/reports/sales/sales_report')
        ? 'salesreport'
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
