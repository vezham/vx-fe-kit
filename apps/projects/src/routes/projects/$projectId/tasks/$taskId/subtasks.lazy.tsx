import { createLazyFileRoute } from '@tanstack/react-router'

import { SubTaskSection } from '../../../../../components/subtasks'

export const Route = createLazyFileRoute(
  '/projects/$projectId/tasks/$taskId/subtasks'
)({
  component: () => <SubTaskSection />
})
