import { Outlet, createLazyFileRoute } from '@tanstack/react-router'

import { BoardDashboard } from '../../../pages/boards'

export const Route = createLazyFileRoute('/boards/$projectId/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <BoardDashboard>
        <Outlet />
      </BoardDashboard>
    </div>
  )
}
