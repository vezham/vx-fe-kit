import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/books-settings/team/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/books-settings/team/"!</div>
}
