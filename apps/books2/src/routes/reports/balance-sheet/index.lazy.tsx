import { createLazyFileRoute } from '@tanstack/react-router'

import BalanceSheet from '../../../pages/reports/balancesheet'

export const Route = createLazyFileRoute('/reports/balance-sheet/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      {' '}
      <BalanceSheet />
    </div>
  )
}
