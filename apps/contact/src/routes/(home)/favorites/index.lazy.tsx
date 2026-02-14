import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/favorites/')({
  component: RouteComponent
})

function RouteComponent() {
  return null
}
