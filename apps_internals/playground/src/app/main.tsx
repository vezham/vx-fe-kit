import { RouterProvider, createRouter } from '@tanstack/react-router'

import { defineConfig } from '@vx/start'
// import { Loading, Lockscreen, NotFound } from '@vezham/templates'

import { routeTree } from '../routeTree.gen'
import './global.css'

// @vx/NOTE: Create a new router instance
const router = createRouter({
  scrollRestoration: true,
  routeTree
  // defaultNotFoundComponent: () => <NotFound app={APP_NAME} />,
  // defaultErrorComponent: () => <Lockscreen />,
  // defaultPendingComponent: () => <Loading />
})

// @vx/NOTE: Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

defineConfig({
  children: <RouterProvider router={router} />
})
