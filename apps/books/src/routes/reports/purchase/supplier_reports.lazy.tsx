import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/reports/reportTabs/purchase/supplierReport'

export const Route = createLazyFileRoute('/reports/purchase/supplier_reports')({
  component: () => <Page />
})
