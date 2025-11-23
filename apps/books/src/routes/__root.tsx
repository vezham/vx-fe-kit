import { createRootRoute } from '@tanstack/react-router'
import { lazy } from 'react'

import BookSettings from '../layouts/sidebar/sidebar-mob'

// import { __DEV__ } from '@v0x/env'

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
      <BookSettings />
      <TanStackRouterDevtools position="bottom-right" />
      {/* {__DEV__ ? <TanStackRouterDevtools position="bottom-right" /> : null} */}
    </>
  )
}
