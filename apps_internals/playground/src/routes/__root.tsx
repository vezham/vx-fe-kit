import { Outlet, createRootRoute } from '@tanstack/react-router'

import { Devtools } from '@vx/devtools'
import { __DEV__ } from '@vx/env/vite'

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  return (
    <>
      <Outlet />
      <Devtools env={__DEV__} />
    </>
  )
}
