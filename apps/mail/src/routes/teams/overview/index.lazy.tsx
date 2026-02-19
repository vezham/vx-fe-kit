import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/teams/overview/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/teams/overview/"!</div>
}
