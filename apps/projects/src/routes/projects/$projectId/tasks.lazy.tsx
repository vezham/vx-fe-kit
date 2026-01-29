import { createLazyFileRoute } from '@tanstack/react-router'

import { ProjectTask } from '../../../components/tasks'

export const Route = createLazyFileRoute('/projects/$projectId/tasks')({
  component: () => <ProjectTask />
})
