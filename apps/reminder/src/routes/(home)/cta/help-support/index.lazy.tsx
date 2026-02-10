import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/cta/help-support/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Help & support</div>
}
