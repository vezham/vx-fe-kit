import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/reports/reportTabs/inventory/itemPurchase/itemPurchase'

export const Route = createLazyFileRoute('/reports/inventory/itempurchase')({
  component: () => <Page />
})
