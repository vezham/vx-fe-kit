import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { defineConfig } from '@vx/start'

// import { Loading, ErrorPage, NotFound } from '@vezham/templates'

import { routeTree } from '../routeTree.gen'
import './global.css'

const queryClient = new QueryClient()

// @vx/NOTE: Create a new router instance
const router = createRouter({
  scrollRestoration: true,
  routeTree,
  context: {
    queryClient
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0
  // defaultPendingComponent: () => <Loading />,
  // defaultErrorComponent: () => <ErrorPage />,
  // defaultNotFoundComponent: () => <NotFound app={APP_NAME} />
})

// @vx/NOTE: Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

defineConfig({
  query: false,
  children: (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
})
