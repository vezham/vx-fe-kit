import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/import-export/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/contacts/import-export/"!</div>
}
