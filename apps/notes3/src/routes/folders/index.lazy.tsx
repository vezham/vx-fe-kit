import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/folders/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/folders/"!</div>
}
