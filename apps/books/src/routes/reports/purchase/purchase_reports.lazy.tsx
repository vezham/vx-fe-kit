import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/reports/reportTabs/purchase/purchaseReport'

export const Route = createLazyFileRoute('/reports/purchase/purchase_reports')({
  component: () => <Page />
})
