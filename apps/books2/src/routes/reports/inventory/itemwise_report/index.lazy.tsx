import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/reports/inventory/itemwise_report/')(
  {
    component: RouteComponent
  }
)

function RouteComponent() {
  return <div>Hello "/reports/sales/itemwise_report/"!</div>
}
