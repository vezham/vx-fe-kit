import { createLazyFileRoute } from '@tanstack/react-router'

import { BoardDashboard } from '../../../../pages/boards'
import { BoardOverview } from '../../../../pages/boards/boardOverview'

export const Route = createLazyFileRoute('/boards/$projectId/overview/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <BoardDashboard>
        <BoardOverview />
      </BoardDashboard>
    </div>
  )
}
