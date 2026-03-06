import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/reports/purchase/purchase_reports/')(
  {
    component: RouteComponent
  }
)

function RouteComponent() {
  return <div>Hello "/reports/purchase/purchase_reports/"!</div>
}
