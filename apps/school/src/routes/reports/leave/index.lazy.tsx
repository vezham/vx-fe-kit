import { createLazyFileRoute } from '@tanstack/react-router'

import ReportsSectionPage from '../../../pages/reports/section'

export const Route = createLazyFileRoute('/reports/leave/')({
  component: () => <ReportsSectionPage title="Leave Reports" />
})
