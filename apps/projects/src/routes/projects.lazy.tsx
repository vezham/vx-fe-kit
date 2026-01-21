import { createLazyFileRoute } from '@tanstack/react-router'

import { ProjectsLayout } from '../pages/projects'

export const Route = createLazyFileRoute('/projects')({
  component: () => <ProjectsLayout />
})
