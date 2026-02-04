// routes/projects/$projectId/tasks/$taskId/index.lazy.tsx
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/projects/$projectId/tasks/$taskId/')(
  {
    component: () => null
  }
)
