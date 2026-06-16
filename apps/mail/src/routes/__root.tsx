import { Outlet, createRootRoute } from '@tanstack/react-router'
import { lazy } from 'react'

import { __DEV__ } from '@vx/system-utils'

import EmailShell from '../layout/email-shell/index'

const TanStackRouterDevtools = lazy(() =>
  import('@tanstack/react-router-devtools').then(d => ({
    default: d.TanStackRouterDevtools
  }))
)

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  return (
    <>
      <EmailShell>
        <Outlet />
      </EmailShell>
      {__DEV__ ? <TanStackRouterDevtools position="bottom-right" /> : null}
    </>
  )
}
