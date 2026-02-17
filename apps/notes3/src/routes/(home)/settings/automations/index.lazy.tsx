import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/settings/automations/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/settings/automations/"!</div>
}
