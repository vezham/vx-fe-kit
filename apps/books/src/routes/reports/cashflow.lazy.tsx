import { createLazyFileRoute } from '@tanstack/react-router'

import CashFlow from '../../pages/reports/reportTabs/cashflow/index'

export const Route = createLazyFileRoute('/reports/cashflow')({
  component: () => <CashFlow />
})
