import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings1/integrations/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/settings/integrations/"!</div>
}
