import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/reports/reportTabs/sales/itemwiseReport/itemWiseReport'

export const Route = createLazyFileRoute('/reports/sales/itemwise_report')({
  component: () => <Page />
})
