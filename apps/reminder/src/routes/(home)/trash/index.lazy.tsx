import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/trash/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/reminders/trash/"!</div>
}
