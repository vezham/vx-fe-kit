import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/operations/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/operations/"!</div>
}
