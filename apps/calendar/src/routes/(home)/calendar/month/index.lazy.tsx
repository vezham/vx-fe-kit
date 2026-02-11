import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/calendar/month/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/calendar/month/"!</div>
}
