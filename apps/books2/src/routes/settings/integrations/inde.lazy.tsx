import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings/integrations/inde')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/settings/integrations/"!</div>
}
