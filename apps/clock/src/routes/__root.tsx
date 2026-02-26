import {
  Outlet,
  createRootRoute,
  useLocation,
  useNavigate
} from '@tanstack/react-router'
import { lazy } from 'react'
import React from 'react'

import { __DEV__ } from '@vx/system-utils'

import { HeaderActionContext, HeaderActions } from '../context/header-action'
import AppContainerHeader from '../layouts/app-container-header'
import { AppLayout } from '../layouts/app-layout'

const TanStackRouterDevtools = lazy(() =>
  import('@tanstack/react-router-devtools').then(d => ({
    default: d.TanStackRouterDevtools
  }))
)

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  const location = useLocation()
  const navigate = useNavigate()

  const [headerActions, setHeaderActions] = React.useState<HeaderActions>({})

  const tabs = [
    { key: 'worldclock', title: 'Worldclock', href: '/' },
    { key: 'alarm', title: 'Alarm', href: '/alarm' },
    { key: 'stopwatch', title: 'Stopwatch', href: '/stopwatch' },
    { key: 'timer', title: 'Timer', href: '/timer' }
  ]

  const selectedKey =
    location.pathname === '/' ? 'worldclock' : location.pathname.split('/')[1]

  return (
    <>
      <AppLayout>
        <AppContainerHeader
          tabs={tabs}
          selectedKey={selectedKey}
          onTabChange={key => {
            const tab = tabs.find(t => t.key === key)
            if (tab?.href) {
              navigate({ to: tab.href })
            }
          }}
          onAdd={headerActions.onAdd}
          onSearch={headerActions.onSearch}
        />

        <HeaderActionContext.Provider value={setHeaderActions}>
          <Outlet />
        </HeaderActionContext.Provider>
      </AppLayout>

      {__DEV__ ? <TanStackRouterDevtools position="bottom-right" /> : null}
    </>
  )
}
