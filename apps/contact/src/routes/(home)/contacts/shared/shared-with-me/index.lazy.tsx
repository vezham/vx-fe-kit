import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/(home)/contacts/shared/shared-with-me/'
)({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/contacts/shared/shared-with-me/"!</div>
}
