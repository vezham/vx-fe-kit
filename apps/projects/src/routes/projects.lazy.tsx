import { createLazyFileRoute } from '@tanstack/react-router'

import { ProjectLayout } from '../layouts/projects'

export const Route = createLazyFileRoute('/projects')({
  component: () => <ProjectLayout />
})
