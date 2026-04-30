import { createLazyFileRoute } from '@tanstack/react-router'

import AcademicDashboardPage from '../../pages/academic1/dashboard'

export const Route = createLazyFileRoute('/academic1/')({
  component: AcademicDashboardPage
})
