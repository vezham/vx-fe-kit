import { createLazyFileRoute } from '@tanstack/react-router'

import ReportsOverview from '../../../pages/reports/overview'

export const Route = createLazyFileRoute('/reports/overview/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <ReportsOverview />
    </div>
  )
}
