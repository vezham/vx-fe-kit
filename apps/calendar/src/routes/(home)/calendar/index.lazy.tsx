import { Outlet, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/calendar/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
