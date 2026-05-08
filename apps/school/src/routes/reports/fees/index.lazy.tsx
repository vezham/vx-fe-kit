import { createLazyFileRoute } from '@tanstack/react-router'

import ReportsSectionPage from '../../../pages/reports/section'

export const Route = createLazyFileRoute('/reports/fees/')({
  component: () => <ReportsSectionPage title="Fees Reports" />
})
