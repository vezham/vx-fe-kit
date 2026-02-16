import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/trash/$trashId/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/trash/$trashId/"!</div>
}
