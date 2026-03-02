import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/shared/shared-with-me/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/calendar/shared/shared-with-me/"!</div>
}
