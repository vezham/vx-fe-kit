import { createLazyFileRoute } from '@tanstack/react-router'

import ReportsSectionPage from '../../../pages/reports/section'

export const Route = createLazyFileRoute('/reports/class/')({
  component: () => <ReportsSectionPage title="Class Reports" />
})
