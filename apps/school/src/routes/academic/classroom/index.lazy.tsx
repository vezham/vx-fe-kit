import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/academic/classroom/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/academic/classroom/"!</div>
}
