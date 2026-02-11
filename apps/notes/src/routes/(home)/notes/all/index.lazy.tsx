import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/notes/all/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/notes/all/"!</div>
}
