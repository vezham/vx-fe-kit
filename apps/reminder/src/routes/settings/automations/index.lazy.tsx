import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/menu'

export const Route = createLazyFileRoute('/settings/automations/')({
  component: () => <div className="p-2">Automation content</div>
})
