import { createLazyFileRoute } from '@tanstack/react-router'

import { Page } from '../../pages/projects'

export const Route = createLazyFileRoute('/projects/')({
  component: () => <Page />
})
