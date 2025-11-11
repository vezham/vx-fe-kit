import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../pages/reports/reportTabs/journalEntries/index'

export const Route = createLazyFileRoute('/reports/journal_entries')({
  component: () => <Page />
})
