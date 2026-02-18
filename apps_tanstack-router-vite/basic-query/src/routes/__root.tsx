import type { QueryClient } from '@tanstack/react-query'
import {
  Link,
  Outlet,
  createRootRouteWithContext
} from '@tanstack/react-router'
import { lazy } from 'react'

import { __DEV__ } from '@vx/system-utils'

const TanStackRouterDevtools = lazy(() =>
  import('@tanstack/react-router-devtools').then(d => ({
    default: d.TanStackRouterDevtools
  }))
)

const ReactQueryDevtools = lazy(() =>
  import('@tanstack/react-query-devtools').then(d => ({
    default: d.ReactQueryDevtools
  }))
)

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
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
          // @ts-expect-error NOTE: for testing
          to="/this-route-does-not-exist"
          activeProps={{
            className: 'font-bold'
          }}>
          This Route Does Not Exist
        </Link>
      </div>
      <hr />
      <Outlet />
      {__DEV__ ? <TanStackRouterDevtools position="bottom-right" /> : null}
      {__DEV__ ? <ReactQueryDevtools /> : null}
    </>
  )
}
