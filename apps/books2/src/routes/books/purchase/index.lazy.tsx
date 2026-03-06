import { createLazyFileRoute } from '@tanstack/react-router'

import PurchasePage from '../../../pages/books/purchase'

export const Route = createLazyFileRoute('/books/purchase/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className="p-3">
      <PurchasePage />
    </div>
  )
}
