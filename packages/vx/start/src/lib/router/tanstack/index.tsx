import { createRouter as createTanstackRouter } from '@tanstack/react-router'

import { APP_NAME, APP_VER } from '@vx/env/vite'
import { ErrorPage, Loading, NotFound } from '@vx/template/components'

export const createRouter: typeof createTanstackRouter = options =>
  createTanstackRouter({
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPendingComponent: Loading,
    defaultErrorComponent: ErrorPage,
    defaultNotFoundComponent: () => (
      <NotFound app={APP_NAME} version={APP_VER} />
    ),
    ...options
  })
