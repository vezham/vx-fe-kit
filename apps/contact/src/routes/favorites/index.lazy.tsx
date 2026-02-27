import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/favorites/')({
  component: RouteComponent
})

function RouteComponent() {
  return null
}
