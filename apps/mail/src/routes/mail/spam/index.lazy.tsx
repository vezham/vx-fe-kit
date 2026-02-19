import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/mail/spam/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/spam/"!</div>
}
