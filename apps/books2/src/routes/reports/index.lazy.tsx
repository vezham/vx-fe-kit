import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/reports/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>reports</div>
}
