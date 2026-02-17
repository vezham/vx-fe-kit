import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/shared/shared-by-me/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/calendar/shared/shared-by-me/"!</div>
}
