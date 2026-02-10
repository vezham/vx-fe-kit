import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/settings/users/')({
  component: () => <div className="p-2">Users content</div>
})
