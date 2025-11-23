import { RouterProvider, createRouter } from '@tanstack/react-router'

import { defineConfig } from '@vx/start'

// import { APP_NAME, defineEnv, defineServerEnv } from '@v0x/env'

import { ThemeProvider } from '../common/context'
import { FocusModeProvider } from '../pages/reports/reportTabs/nexus_test/context/FocusModeContext'
import { routeTree } from '../routeTree.gen'
import './global.css'

// wjdlz/NOTE: Create a new router instance
const router = createRouter({
  scrollRestoration: true,
  routeTree
  // defaultNotFoundComponent: () => <NotFound app={APP_NAME} />
})

// wjdlz/NOTE: Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

defineConfig({
  // env: defineEnv,
  name: '', // APP_NAME,
  children: (
    <ThemeProvider>
      <FocusModeProvider>
        <RouterProvider router={router} />{' '}
      </FocusModeProvider>
    </ThemeProvider>
  )
  // defineServerEnv
})
