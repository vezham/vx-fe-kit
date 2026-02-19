import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings/billing/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/settings/billing/"!</div>
}
