import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/notes/folders/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/notes/folders/"!</div>
}
