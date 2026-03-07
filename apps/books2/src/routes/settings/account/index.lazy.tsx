import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings/account/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/settings/account/"!</div>
}
