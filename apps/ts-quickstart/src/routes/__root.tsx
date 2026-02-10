import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { lazy } from 'react'

import { __DEV__ } from '@vx/system-utils'

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
      <div className="flex gap-2 p-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: 'font-bold'
          }}
          activeOptions={{ exact: true }}>
          Home
        </Link>{' '}
        <Link
          to="/about"
          activeProps={{
            className: 'font-bold'
          }}>
          About
        </Link>
        <Link
          to="/posts"
          activeProps={{
            className: 'font-bold'
          }}>
          Posts
        </Link>
      </div>
      <hr />
      <Outlet />
      {__DEV__ ? <TanStackRouterDevtools position="bottom-right" /> : null}
    </>
  )
}
