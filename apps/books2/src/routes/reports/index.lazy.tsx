import { createLazyFileRoute } from '@tanstack/react-router'

import Reports from '../../pages/reports'

export const Route = createLazyFileRoute('/reports/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <Reports />
    </div>
  )
}
