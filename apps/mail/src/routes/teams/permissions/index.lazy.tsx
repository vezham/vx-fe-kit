import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/teams/permissions/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/teams/permissions/"!</div>
}
