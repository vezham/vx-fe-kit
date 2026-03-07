import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/books-settings/company/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/books-settings/company/"!</div>
}
