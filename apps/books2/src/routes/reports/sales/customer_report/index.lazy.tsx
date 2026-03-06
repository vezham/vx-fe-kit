import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/reports/sales/customer_report/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/reports/sales/customer_report/"!</div>
}
