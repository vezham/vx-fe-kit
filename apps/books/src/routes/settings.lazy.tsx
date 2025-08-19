import { createLazyFileRoute } from '@tanstack/react-router'

import Settings from '../pages/settings/settings'

export const Route = createLazyFileRoute('/settings')({
  component: () => <Settings />
})
