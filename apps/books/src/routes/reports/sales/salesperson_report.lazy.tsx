import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/reports/reportTabs/sales/salesPerson/salesPerson'

export const Route = createLazyFileRoute('/reports/sales/salesperson_report')({
  component: () => <Page />
})
