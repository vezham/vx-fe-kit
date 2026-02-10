import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/$reminderId/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>remainder Id</div>
}
