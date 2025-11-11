import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/reports/reportTabs/sales/salesPerson'

export const Route = createLazyFileRoute('/reports/sales/sales_report')({
  component: () => <Page />
})
