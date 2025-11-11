import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/reports/reportTabs/purchase/itemWiseReport'

export const Route = createLazyFileRoute('/reports/purchase/itemwise_reports')({
  component: () => <Page />
})
