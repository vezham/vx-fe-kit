import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/bank/accounts/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/bank/accounts/"!</div>
}
