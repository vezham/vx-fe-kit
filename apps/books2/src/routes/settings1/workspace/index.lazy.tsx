import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings1/workspace/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/settings/workspace/"!</div>
}
