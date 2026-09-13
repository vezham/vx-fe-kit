import {
  Outlet,
  createRouter as createTanstackRouter
} from '@tanstack/react-router'

import { APP_NAME, APP_VER, __DEV__ } from '@vx/env/vite'
import { ErrorPage, Loading, NotFound } from '@vx/template/components'

import { ClientDevtools } from '../../provider/shared/devtools'

export const RouterRoot = () => (
  <>
    <Outlet />
    <ClientDevtools env={__DEV__} />
  </>
)

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
