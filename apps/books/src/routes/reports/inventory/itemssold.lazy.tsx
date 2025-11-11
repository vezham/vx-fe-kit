import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/reports/reportTabs/inventory/itemSold'

export const Route = createLazyFileRoute('/reports/inventory/itemssold')({
  component: () => <Page />
})
