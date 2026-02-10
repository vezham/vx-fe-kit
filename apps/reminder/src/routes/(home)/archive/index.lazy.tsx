import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/archive/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Archive</div>
}
