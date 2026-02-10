import {
  Link,
  Outlet,
  createRootRoute,
  useRouterState
} from '@tanstack/react-router'
import { lazy } from 'react'

import { __DEV__ } from '@vx/system-utils'

import { Breadcrumbs } from '../components/Breadcrumbs'
import { Spinner } from '../components/Spinner'

const TanStackRouterDevtools = lazy(() =>
  import('@tanstack/react-router-devtools').then(d => ({
    default: d.TanStackRouterDevtools
  }))
)
function RouterSpinner() {
  const isLoading = useRouterState({ select: s => s.status === 'pending' })
  return <Spinner show={isLoading} />
}

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  return (
    <>
      <div className={`flex min-h-screen flex-col`}>
        <div className={`flex items-center gap-2 border-b`}>
          <h1 className={`p-2 text-3xl`}>Kitchen Sink</h1>
          <Breadcrumbs />
          <div className={`text-3xl`}>
            <RouterSpinner />
          </div>
        </div>
        <div className={`flex flex-1`}>
          <div className={`w-56 divide-y`}>
            {(
              [
                ['/', 'Home'],
                ['/dashboard', 'Dashboard'],
                ['/expensive', 'Expensive'],
                ['/route-a', 'Pathless Layout A'],
                ['/route-b', 'Pathless Layout B'],
                ['/profile', 'Profile'],
                ['/login', 'Login'],
                ['/route-group', 'Route Group']
              ] as const
            ).map(([to, label]) => {
              return (
                <div key={to}>
                  <Link
                    to={to}
                    activeOptions={
                      {
                        // If the route points to the root of it's parent,
                        // make sure it's only active if it's exact
                        // exact: to === '.',
                      }
                    }
                    preload="intent"
                    className={`block px-3 py-2 text-blue-700`}
                    activeProps={{ className: `font-bold` }}>
                    {label}
                  </Link>
                </div>
              )
            })}
          </div>
          <div className={`flex-1 border-l`}>
            <Outlet />
          </div>
        </div>
      </div>
      {__DEV__ ? <TanStackRouterDevtools position="bottom-right" /> : null}
    </>
  )
}
