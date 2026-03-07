import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/reports/sales/sales-report/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/reports/sales/sales_report/"!</div>
}
