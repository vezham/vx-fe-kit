import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/calendar/events/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/calendar/events/"!</div>
}
