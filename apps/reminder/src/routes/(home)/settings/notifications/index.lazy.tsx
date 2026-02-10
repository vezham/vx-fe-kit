import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/settings/notifications/')({
  component: () => <div className="p-2">Notifications content</div>
})
