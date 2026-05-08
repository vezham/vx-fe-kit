import { createLazyFileRoute } from '@tanstack/react-router'

import ReportsSectionPage from '../../../pages/reports/section'

export const Route = createLazyFileRoute('/reports/grade/')({
  component: () => <ReportsSectionPage title="Grade Reports" />
})
