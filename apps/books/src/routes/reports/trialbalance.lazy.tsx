import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../pages/reports/reportTabs/trialbalance/index'

export const Route = createLazyFileRoute('/reports/trialbalance')({
  component: () => <Page />
})
