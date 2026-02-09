import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/menu'

export const Route = createLazyFileRoute('/settings/security/')({
  component: () => <div className="p-2">Security Content</div>
})
