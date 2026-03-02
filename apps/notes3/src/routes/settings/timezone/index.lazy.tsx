import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings/timezone/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/settings/timezone/"!</div>
}
