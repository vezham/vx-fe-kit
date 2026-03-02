import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/week/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/calendar/week/"!</div>
}
