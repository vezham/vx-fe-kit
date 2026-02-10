import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/completed/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Completed</div>
}
