import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/trash/$trashId/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/trash/$trashId/"!</div>
}
