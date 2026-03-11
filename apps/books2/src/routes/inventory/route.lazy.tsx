import { Outlet, createLazyFileRoute } from '@tanstack/react-router'

import { Surface } from '@vezham/react/v3'

import AppContainerHeader from '../../layouts/app-container-header'

export const Route = createLazyFileRoute('/inventory')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className="flex h-screen w-full flex-col p-4">
      <Surface variant="transparent" className="p-3">
        <AppContainerHeader showAdd showMore showSearch />
      </Surface>

      <div className="flex flex-1 overflow-hidden">
        <Surface className="flex-1 overflow-auto p-4">
          <Outlet />
        </Surface>
      </div>
    </div>
  )
}
