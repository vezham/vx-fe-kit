import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/notes/archived/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/notes/archived/"!</div>
}
