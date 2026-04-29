import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/academic/classroutine/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/academic/classroutine/"!</div>
}
