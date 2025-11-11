import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/reports/reportTabs/inventory/itemInventoryWiseReport'

export const Route = createLazyFileRoute('/reports/inventory/itemwise')({
  component: () => <Page />
})
