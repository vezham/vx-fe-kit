import { createLazyFileRoute } from '@tanstack/react-router'

import { ProjectLayout } from '../pages/projects'

export const Route = createLazyFileRoute('/projects')({
  component: () => <ProjectLayout />
})
