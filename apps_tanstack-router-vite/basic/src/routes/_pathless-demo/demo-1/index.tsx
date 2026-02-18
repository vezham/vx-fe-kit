import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pathless-demo/demo-1/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "DEMO 1"!</div>
}
