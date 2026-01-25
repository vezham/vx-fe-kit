import { createLazyFileRoute } from '@tanstack/react-router'

import { ProjectTask } from '../../../layouts/projects/ProjectTask'

export const Route = createLazyFileRoute('/projects/$projectId/tasks')({
  component: () => <ProjectTask />
})
