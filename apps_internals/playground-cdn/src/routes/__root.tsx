import { Outlet, createRootRoute } from '@tanstack/react-router'

import { __DEV__ } from '@vx/env/vite'
import { ClientDevtools } from '@vx/start/vite'

const RootComponent = () => {
  return (
    <>
      <Outlet />
      <ClientDevtools env={__DEV__} />
    </>
  )
}

export const Route = createRootRoute({
  component: RootComponent
})
