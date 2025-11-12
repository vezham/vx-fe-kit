import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../pages/reports/reportTabs/inventory/index'

export const Route = createLazyFileRoute('/reports/inventory')({
  component: () => <Page />
})
