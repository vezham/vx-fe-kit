import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/calendar/today/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/calendar/today/"!</div>
}
