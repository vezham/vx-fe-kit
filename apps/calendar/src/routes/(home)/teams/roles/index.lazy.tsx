import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/teams/roles/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/teams/roles/"!</div>
}
