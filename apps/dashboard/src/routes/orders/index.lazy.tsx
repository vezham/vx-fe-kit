import { createLazyFileRoute } from '@tanstack/react-router'

import { OrdersPage } from '@/src/views/orders-page'

export const Route = createLazyFileRoute('/orders/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <OrdersPage />
    </div>
  )
}
