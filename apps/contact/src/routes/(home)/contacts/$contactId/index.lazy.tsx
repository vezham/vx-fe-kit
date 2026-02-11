import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/contacts/$contactId/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/contacts/$contactId/"!</div>
}
