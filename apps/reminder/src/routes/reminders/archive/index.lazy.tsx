import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/reminders/archive/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Archive</div>
}
