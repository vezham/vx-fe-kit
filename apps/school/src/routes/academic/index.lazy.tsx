import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/academic/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/academic/"!</div>
}
