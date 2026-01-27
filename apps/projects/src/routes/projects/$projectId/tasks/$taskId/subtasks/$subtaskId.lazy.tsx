import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/projects/$projectId/tasks/$taskId/subtasks/$subtaskId'
)({
  component: () => null
})
