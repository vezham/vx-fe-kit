import { createLazyFileRoute } from '@tanstack/react-router'

import { SubTaskSection } from '../../../../../layouts/projects/subtasks'

export const Route = createLazyFileRoute(
  '/projects/$projectId/tasks/$taskId/subtasks'
)({
  component: () => <SubTaskSection />
})
