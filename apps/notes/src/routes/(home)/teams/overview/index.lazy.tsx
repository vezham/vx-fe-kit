import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/teams/overview/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/teams/Overview/"!</div>
}
