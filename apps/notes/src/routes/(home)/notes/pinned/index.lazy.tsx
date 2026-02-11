import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/notes/pinned/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/notes/pinned/"!</div>
}
