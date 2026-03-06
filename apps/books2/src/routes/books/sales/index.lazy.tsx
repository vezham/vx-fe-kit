import { createLazyFileRoute } from '@tanstack/react-router'

import SalesPage from '../../../pages/books/sales'

export const Route = createLazyFileRoute('/books/sales/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className="p-3">
      <SalesPage />
    </div>
  )
}
