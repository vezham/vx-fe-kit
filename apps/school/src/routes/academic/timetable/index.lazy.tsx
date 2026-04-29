import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/academic/timetable/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/academic/timetable/"!</div>
}
