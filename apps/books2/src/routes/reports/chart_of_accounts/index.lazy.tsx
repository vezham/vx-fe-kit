import { createLazyFileRoute } from '@tanstack/react-router'

import Charts from '../../../pages/reports/chartofaccounts'

export const Route = createLazyFileRoute('/reports/chart_of_accounts/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <Charts />
    </div>
  )
}
