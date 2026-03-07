import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings/company/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/settings/company/"!</div>
}
