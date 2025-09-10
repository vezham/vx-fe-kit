import { createLazyFileRoute } from '@tanstack/react-router'

import Charts from '../../pages/reports/reportTabs/chartofaccounts/index'

export const Route = createLazyFileRoute('/reports/chartofaccounts')({
  component: () => <Charts />
})
