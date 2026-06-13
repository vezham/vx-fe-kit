import { createLazyFileRoute } from '@tanstack/react-router'

import { DashboardPage } from '../views/dashboard-page'

export const Route = createLazyFileRoute('/')({
  component: () => <DashboardPage />
})
