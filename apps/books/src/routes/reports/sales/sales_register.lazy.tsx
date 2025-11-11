import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/reports/reportTabs/sales/salesRegister'

export const Route = createLazyFileRoute('/reports/sales/sales_register')({
  component: () => <Page />
})
