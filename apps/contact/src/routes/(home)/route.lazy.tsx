import {
  Outlet,
  createLazyFileRoute,
  useMatchRoute
} from '@tanstack/react-router'

import Page from '../../components/menu/layout'
import Sidebar from '../../components/sidebar'

export const Route = createLazyFileRoute('/(home)')({
  component: HomeLayout
})

function HomeLayout() {
  const matchRoute = useMatchRoute()

  const isSettings = matchRoute({ to: '/settings', fuzzy: true })
  const isNotifications = matchRoute({ to: '/notifications', fuzzy: true })
  const isTeams = matchRoute({ to: '/teams', fuzzy: true })
  const isCTA = matchRoute({ to: '/cta/help-support', fuzzy: true })

  const hideSidebar = isSettings || isNotifications || isTeams || isCTA

  return (
    <Page
      menu={[
        { label: 'Home', href: '/' },
        { label: 'Notifications', href: '/notifications' },
        { label: 'Teams', href: '/teams' },
        { label: 'Settings', href: '/settings' },
        { label: 'CTA', href: '/cta' }
      ]}
      sidebar={
        hideSidebar ? null : (
          <Sidebar
            sidebar={[
              { label: 'All', href: '/contacts/all' },
              { label: 'Favorites', href: '/contacts/favorites' },
              { label: 'Recently Added', href: '/contacts/recent' },
              { label: 'Groups', href: '/contacts/groups' },
              { label: 'Shared', href: '/contacts/shared' },
              { label: 'Import / Export', href: '/contacts/import-export' }
            ]}
          />
        )
      }>
      <Outlet />
    </Page>
  )
}
