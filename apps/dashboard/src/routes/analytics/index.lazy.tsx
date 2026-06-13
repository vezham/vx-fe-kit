import { createLazyFileRoute } from '@tanstack/react-router'

import { AnalyticsPage } from '@/src/views/analytics-page'

export const Route = createLazyFileRoute('/analytics/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <AnalyticsPage />
    </div>
  )
}
