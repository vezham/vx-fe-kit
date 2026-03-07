import { Outlet, createLazyFileRoute } from '@tanstack/react-router'

import { Surface } from '@vezham/react/v3'

export const Route = createLazyFileRoute('/reports/purchase')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <Surface className="flex h-full flex-col overflow-hidden">
      <Surface className="flex-1 overflow-auto p-4">
        <Outlet />
      </Surface>
    </Surface>
  )
}
