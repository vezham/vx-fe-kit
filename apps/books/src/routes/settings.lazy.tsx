import { createLazyFileRoute } from '@tanstack/react-router'

import Settings from '../layouts/settings/index'

export const Route = createLazyFileRoute('/settings')({
  component: () => <Settings />
})
