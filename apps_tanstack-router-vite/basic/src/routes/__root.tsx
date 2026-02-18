import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { lazy } from 'react'

import { __DEV__ } from '@vx/system-utils'

const TanStackRouterDevtools = lazy(() =>
  import('@tanstack/react-router-devtools').then(d => ({
    default: d.TanStackRouterDevtools
  }))
)

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/">Start Over</Link>
      </div>
    )
  }
})

function RootComponent() {
  return (
    <>
      <div className="flex gap-2 border-b p-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: 'font-bold'
          }}
          activeOptions={{ exact: true }}>
          Home
        </Link>{' '}
        <Link
          to="/posts"
          activeProps={{
            className: 'font-bold'
          }}>
          Posts
        </Link>{' '}
        <Link
          to="/route-a"
          activeProps={{
            className: 'font-bold'
          }}>
          Pathless Layout
        </Link>{' '}
        <Link
          to="/anchor"
          activeProps={{
            className: 'font-bold'
          }}>
          Anchor
        </Link>{' '}
        <Link
          // @ts-expect-error NOTE: for testing
          to="/this-route-does-not-exist"
          activeProps={{
            className: 'font-bold'
          }}>
          This Route Does Not Exist
        </Link>
        / Pathless:
        <Link
          to="/demo"
          activeProps={{
            className: 'font-bold'
          }}>
          Demo
        </Link>
        <Link
          to="/demo-1"
          activeProps={{
            className: 'font-bold'
          }}>
          Demo 1
        </Link>
        <Link
          to="/demo-2"
          activeProps={{
            className: 'font-bold'
          }}>
          Demo 2
        </Link>
      </div>
      <hr />
      <Outlet />
      {__DEV__ ? <TanStackRouterDevtools position="bottom-right" /> : null}
    </>
  )
}
