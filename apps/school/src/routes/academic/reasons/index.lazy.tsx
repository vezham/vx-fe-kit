import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/academic/reasons/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/academic/reasons/"!</div>
}
