import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/reports/reportTabs/inventory/itemPurchase'

export const Route = createLazyFileRoute('/reports/inventory/itemspurchase')({
  component: () => <Page />
})
