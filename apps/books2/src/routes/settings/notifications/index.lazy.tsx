import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings/notifications/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/settings/notifications/"!</div>
}
