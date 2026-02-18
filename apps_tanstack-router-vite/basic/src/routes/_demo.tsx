import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_demo')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      Hello "/_demo"! <Outlet />{' '}
    </div>
  )
}
