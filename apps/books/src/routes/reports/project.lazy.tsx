import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../pages/reports/reportTabs/project/index'

export const Route = createLazyFileRoute('/reports/project')({
  component: () => <Page />
})
