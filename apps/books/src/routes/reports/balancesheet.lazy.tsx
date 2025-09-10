import { createLazyFileRoute } from '@tanstack/react-router'

import Balance from '../../pages/reports/reportTabs/balancesheet/index'

export const Route = createLazyFileRoute('/reports/balancesheet')({
  component: () => <Balance />
})
