import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings/notifications/')({
  component: () => <div className="p-2">Notifications content</div>
})
