import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/reports/purchase/purchaser-reports/'
)({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/reports/purchase/purchaser_reports/"!</div>
}
