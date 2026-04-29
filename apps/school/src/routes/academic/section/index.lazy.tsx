import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/academic/section/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/academic/section/"!</div>
}
