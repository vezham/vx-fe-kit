import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/settings/security/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/settings/security/"!</div>
}
