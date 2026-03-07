import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings1/billing/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/settings/billing/"!</div>
}
