import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/reports/purchase/itemwise_reports/')(
  {
    component: RouteComponent
  }
)

function RouteComponent() {
  return <div>Hello "/reports/purchase/itemwise_reports/"!</div>
}
