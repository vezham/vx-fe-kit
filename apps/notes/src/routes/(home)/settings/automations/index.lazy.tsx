import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/settings/automations/')({
  component: () => <div className="p-2">Automation content</div>
})
