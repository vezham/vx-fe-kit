import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pathless-demo/demo-2/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "DEMO 2"!</div>
}
