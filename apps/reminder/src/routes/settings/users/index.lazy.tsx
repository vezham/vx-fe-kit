import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings/users/')({
  component: () => <div className="p-2">Users content</div>
})
