import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../pages/reports/reportTabs/vat/index'

export const Route = createLazyFileRoute('/reports/vat')({
  component: () => <Page />
})
