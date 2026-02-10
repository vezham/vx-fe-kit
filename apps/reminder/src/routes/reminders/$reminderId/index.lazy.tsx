import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/reminders/$reminderId/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/reminders/$reminderId/"!</div>
}
