import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/settings/security/')({
  component: () => <div className="p-2">Security content</div>
})
