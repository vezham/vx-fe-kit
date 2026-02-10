import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/reminders/lists/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/lists/"!</div>
}
