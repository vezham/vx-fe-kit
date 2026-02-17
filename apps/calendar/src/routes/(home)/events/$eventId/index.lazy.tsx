import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/events/$eventId/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/events/$eventId/"!</div>
}
