import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/menu'

export const Route = createLazyFileRoute('/settings/workspace/')({
  component: () => <div className="p-2">Workspace</div>
})
