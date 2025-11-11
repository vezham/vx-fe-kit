import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/reports/reportTabs/sales/customerReport'

export const Route = createLazyFileRoute('/reports/sales/customer_report')({
  component: () => <Page />
})
