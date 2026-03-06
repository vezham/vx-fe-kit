import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/reports/purchase/supplier_reports/')(
  {
    component: RouteComponent
  }
)

function RouteComponent() {
  return <div>Hello "/reports/purchase/supplier_reports/"!</div>
}
