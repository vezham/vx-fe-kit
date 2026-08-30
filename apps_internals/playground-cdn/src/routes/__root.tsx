import { Outlet, createRootRoute } from '@tanstack/react-router'

import { __DEV__ } from '@vx/env/vite'
import { ClientDevtools } from '@vx/start/vite'

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  return (
    <>
      <Outlet />
      <ClientDevtools env={__DEV__} />
    </>
  )
}
