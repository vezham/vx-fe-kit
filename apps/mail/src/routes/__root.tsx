import { Outlet, createRootRoute } from '@tanstack/react-router'
import { lazy } from 'react'

import { __DEV__ } from '@vx/system-utils'

import { Header } from '../components/header'
import { Sidebar } from '../components/sidebar'
import AppLayout from '../layouts/app-layout'
import CreateMail from '../pages/mail/inbox/create-mail'

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
      <AppLayout header={<Header />} sidebar={<Sidebar />}>
        <Outlet />
        <CreateMail />
      </AppLayout>

      {__DEV__ ? <TanStackRouterDevtools position="bottom-right" /> : null}
    </>
  )
}
