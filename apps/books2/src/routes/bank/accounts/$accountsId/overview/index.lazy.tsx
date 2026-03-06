import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/bank/accounts/$accountsId/overview/'
)({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/bank/accounts/$accountsId/overview/"!</div>
}
