import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/menu'

export const Route = createLazyFileRoute('/settings/billing/')({
  component: () => <div className="p-2">Billing content</div>
})
