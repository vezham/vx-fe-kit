import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/settings/workspace/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/settings/workspace/"!</div>
}
