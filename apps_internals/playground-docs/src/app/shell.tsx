import { createRouter } from '@vx/start/router/tanstack'

import { routeTree } from '@src/routeTree.gen'

import './global.css'

// @vx/NOTE: Create a new router instance
export const router = createRouter({
  routeTree
})

// @vx/NOTE: Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
