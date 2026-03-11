import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/inventory/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/inventory/"!</div>
}
