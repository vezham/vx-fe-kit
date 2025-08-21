import { createLazyFileRoute } from '@tanstack/react-router'

import Settings from '../pages/settings-new/components/settings-layout-base'

export const Route = createLazyFileRoute('/settings')({
  component: () => <Settings />
})
