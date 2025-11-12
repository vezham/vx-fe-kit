import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/reports/reportTabs/inventory/itemwise/itemInventoryWiseReport'

export const Route = createLazyFileRoute('/reports/inventory/itemwise')({
  component: () => <Page />
})
