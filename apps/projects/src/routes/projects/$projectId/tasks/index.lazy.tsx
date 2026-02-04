import { createLazyFileRoute } from '@tanstack/react-router'

import { ProjectTask } from '../../../../layouts/tasks'

export const Route = createLazyFileRoute('/projects/$projectId/tasks/')({
  component: () => <ProjectTask />
})
