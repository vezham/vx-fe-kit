import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/lists/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/lists/"!</div>
}
