import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/year/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/calendar/year/"!</div>
}
