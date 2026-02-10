import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/reminders/trash/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/reminders/trash/"!</div>
}
