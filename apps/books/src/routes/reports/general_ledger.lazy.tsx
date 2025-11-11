import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../pages/reports/reportTabs/generalLedger/index'

export const Route = createLazyFileRoute('/reports/general_ledger')({
  component: () => <Page />
})
