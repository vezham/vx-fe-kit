import { createLazyFileRoute } from '@tanstack/react-router'

import { BoardDashboard } from '../../pages/boards'

export const Route = createLazyFileRoute('/boards/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <BoardDashboard />
    </div>
  )
}
