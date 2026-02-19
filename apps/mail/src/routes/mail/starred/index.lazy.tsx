import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/mail/starred/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/starred/"!</div>
}
