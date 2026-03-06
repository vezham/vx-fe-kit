import { createLazyFileRoute } from '@tanstack/react-router'

import CashFlowStatement from '../../../pages/reports/cashflow'

export const Route = createLazyFileRoute('/reports/cashflow/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <CashFlowStatement />
    </div>
  )
}
