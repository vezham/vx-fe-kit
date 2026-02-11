import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/(home)/notes/shared/shared-with-me/'
)({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/notes/shared/shared-with-me/"!</div>
}
