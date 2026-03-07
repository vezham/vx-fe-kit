import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/books-settings/account/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/books-settings/account/"!</div>
}
