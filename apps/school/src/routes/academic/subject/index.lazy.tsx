import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/academic/subject/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/academic/subject/"!</div>
}
