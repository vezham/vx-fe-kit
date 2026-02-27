import {
  Outlet,
  createRootRoute,
  useMatchRoute,
  useRouterState
} from '@tanstack/react-router'
import { lazy } from 'react'

import { __DEV__ } from '@vx/system-utils'

import { AppLayout } from '../layouts/app-layout'
import ContactList from '../pages/contact'
import FavoriteList from '../pages/favorites'
import GroupsList from '../pages/groups'

const TanStackRouterDevtools = lazy(() =>
  import('@tanstack/react-router-devtools').then(d => ({
    default: d.TanStackRouterDevtools
  }))
)

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  const matchRoute = useMatchRoute()
  const { location } = useRouterState()

  const isSettings = matchRoute({ to: '/settings', fuzzy: true })
  const isNotifications = matchRoute({ to: '/notifications', fuzzy: true })
  const isTeams = matchRoute({ to: '/teams', fuzzy: true })
  const isCTA = matchRoute({ to: '/cta/help-support', fuzzy: true })
  const isShared = Boolean(matchRoute({ to: '/shared', fuzzy: true }))
  const isImport = Boolean(matchRoute({ to: '/import-export', fuzzy: true }))

  const hideChild =
    isImport || isShared || isSettings || isNotifications || isTeams || isCTA

  let sidebarChild = null
  if (!hideChild) {
    if (location.pathname === '/favorites') {
      sidebarChild = <FavoriteList />
    } else if (location.pathname === '/groups') {
      sidebarChild = <GroupsList />
    } else {
      sidebarChild = <ContactList />
    }
  }

  return (
    <>
      <AppLayout>
        <Outlet />
      </AppLayout>
      {__DEV__ ? <TanStackRouterDevtools position="bottom-right" /> : null}
    </>
  )
}
