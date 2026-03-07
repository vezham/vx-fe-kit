import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/reports/sales/sales-register/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/reports/sales/sales_register/"!</div>
}
