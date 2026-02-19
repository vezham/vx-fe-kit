import { Outlet, createRootRoute } from '@tanstack/react-router'
import { lazy } from 'react'

import { __DEV__ } from '@vx/system-utils'

import { Header } from '../components/header'
import Page from '../components/menu/layout'
import { Sidebar } from '../components/sidebar'
import ComposeModal from '../pages/mail/createModal'

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
      <Page header={<Header />} sidebar={<Sidebar />}>
        <Outlet />
        <ComposeModal />
      </Page>
      {__DEV__ ? <TanStackRouterDevtools position="bottom-right" /> : null}
    </>
  )
}
