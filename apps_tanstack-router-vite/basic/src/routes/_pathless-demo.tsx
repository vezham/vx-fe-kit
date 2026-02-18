import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pathless-demo')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      Hello "/_pathless-demo"! <Outlet />{' '}
    </div>
  )
}
