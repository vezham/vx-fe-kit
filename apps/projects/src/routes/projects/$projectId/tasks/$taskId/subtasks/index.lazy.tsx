import { createLazyFileRoute } from '@tanstack/react-router'

import { SubTaskSection } from '../../../../../../layouts/subtasks'

export const Route = createLazyFileRoute(
  '/projects/$projectId/tasks/$taskId/subtasks/'
)({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <SubTaskSection />
    </div>
  )
}
