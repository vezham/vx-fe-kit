import { createLazyFileRoute } from '@tanstack/react-router'

import ProfitLoss from '../../pages/reports/reportTabs/profit_loss/index'

export const Route = createLazyFileRoute('/reports/profitloss')({
  component: () => <ProfitLoss />
})
