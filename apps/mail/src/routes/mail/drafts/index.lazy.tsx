import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/mail/drafts/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/drafts/"!</div>
}
