import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../pages/reports/reportTabs/purchase/index'

export const Route = createLazyFileRoute('/reports/purchase')({
  component: () => <Page />
})
