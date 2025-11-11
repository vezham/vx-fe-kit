import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/reports/reportTabs/sales/itemWiseReport'

export const Route = createLazyFileRoute('/reports/sales/itemwise_report')({
  component: () => <Page />
})
