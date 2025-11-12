import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../pages/reports/reportTabs/sales/index'

export const Route = createLazyFileRoute('/reports/sales')({
  component: () => <Page />
})
