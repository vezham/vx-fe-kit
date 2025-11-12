import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/reports/reportTabs/purchase/purchaseReport/purchaseReport'

export const Route = createLazyFileRoute('/reports/purchase/purchase_reports')({
  component: () => <Page />
})
