import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/mail/sent/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/sent/"!</div>
}
