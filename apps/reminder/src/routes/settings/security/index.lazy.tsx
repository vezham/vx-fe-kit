import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings/security/')({
  component: () => <div className="p-2">Security content</div>
})
