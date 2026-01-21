import { createLazyFileRoute } from '@tanstack/react-router'

import Projects from '../../layouts/projects'

export const Route = createLazyFileRoute('/projects/')({
  component: () => <Projects />
})
