import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/academic/homework/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/academic/homework/"!</div>
}
