import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/blogs/')({
  component: () => <div>Blogs</div>
})
