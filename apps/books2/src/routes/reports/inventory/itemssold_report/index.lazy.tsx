import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/reports/inventory/itemssold_report/'
)({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/reports/inventory/itemssold_report/"!</div>
}
