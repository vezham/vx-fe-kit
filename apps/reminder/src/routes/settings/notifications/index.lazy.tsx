import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/menu'

export const Route = createLazyFileRoute('/settings/notifications/')({
  component: () => <div className="p-2">Notification Content</div>
})
