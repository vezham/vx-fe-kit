import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/groups/$groupId/')({
  component: RouteComponent
})

function RouteComponent() {
  return null
}
