import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/mail/trash/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/trash/"!</div>
}
