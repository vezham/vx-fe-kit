import { createLazyFileRoute } from '@tanstack/react-router'

import ProfitLoss from '../../../pages/reports/profit_loss'

export const Route = createLazyFileRoute('/reports/profit-loss/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <ProfitLoss />
    </div>
  )
}
