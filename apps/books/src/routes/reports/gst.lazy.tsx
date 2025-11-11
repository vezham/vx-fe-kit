import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../pages/reports/reportTabs/gst/index'

export const Route = createLazyFileRoute('/reports/gst')({
  component: () => <Page />
})
