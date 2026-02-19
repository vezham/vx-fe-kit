import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/teams/members/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/teams/members/"!</div>
}
