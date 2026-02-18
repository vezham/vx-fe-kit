import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_demo/demo/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "DEMO"!</div>
}
