import { createLazyFileRoute } from '@tanstack/react-router'

import Overview from '../../pages/reports/reportTabs/overview'

export const Route = createLazyFileRoute('/reports/overview')({
  component: () => <Overview />
})
