import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/reports/reportTabs/inventory/itemSold/itemSold'

export const Route = createLazyFileRoute('/reports/inventory/itemsold')({
  component: () => <Page />
})
