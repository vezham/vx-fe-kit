import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/notes/shared/shared-by-me/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/notes/shared/shared-by-me/"!</div>
}
