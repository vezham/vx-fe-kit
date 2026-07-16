import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute
} from '@tanstack/react-router'
import { lazy } from 'react'

import { __DEV__ } from '@vx/env/vite'
import { Provider } from '@vx/start/tanstack'

const TanStackRouterDevtools = lazy(() =>
  import('@tanstack/react-router-devtools').then(d => ({
    default: d.TanStackRouterDevtools
  }))
)

export const Route = createRootRoute({
  component: RootComponent
})

// function RootComponent() {
//   return (
//     <>
//       <Outlet />
//       {__DEV__ ? <TanStackRouterDevtools position="bottom-right" /> : null}
//     </>
//   )
// }

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <Provider>{children}</Provider>

        {__DEV__ ? <TanStackRouterDevtools position="bottom-right" /> : null}
        <Scripts />
      </body>
    </html>
  )
}
