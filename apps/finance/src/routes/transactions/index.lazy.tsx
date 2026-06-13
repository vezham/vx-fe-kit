import { createLazyFileRoute } from '@tanstack/react-router'

import { TransactionsPage } from '@/src/views/transactions-page'

export const Route = createLazyFileRoute('/transactions/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <TransactionsPage />
    </div>
  )
}
