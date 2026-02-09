import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/menu'

export const Route = createLazyFileRoute('/settings/users/')({
  component: () => <div className="p-2">Users & Roles</div>
})
