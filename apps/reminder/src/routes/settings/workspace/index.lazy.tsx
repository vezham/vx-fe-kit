import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings/workspace/')({
  component: () => <div className="p-2">Workspace content</div>
})
