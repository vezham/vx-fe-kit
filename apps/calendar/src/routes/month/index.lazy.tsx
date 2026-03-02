import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/month/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/calendar/month/"!</div>
}
