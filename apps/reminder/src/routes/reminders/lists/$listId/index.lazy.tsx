import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/reminders/lists/$listId/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/lists/$listId/"!</div>
}
