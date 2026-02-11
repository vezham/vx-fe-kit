import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/teams/members/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/teams/members/"!</div>
}
