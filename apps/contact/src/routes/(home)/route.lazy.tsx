import {
  Outlet,
  createLazyFileRoute,
  useMatchRoute,
  useRouterState
} from '@tanstack/react-router'

import Page from '../../components/menu/layout'
import Sidebar from '../../components/sidebar'
import ContactList from '../../pages/contact'
import FavoriteList from '../../pages/favorites'
import GroupsList from '../../pages/groups'

export const Route = createLazyFileRoute('/(home)')({
  component: HomeLayout
})

function HomeLayout() {
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
    <Page
      header={[
        { icon: 'mdi:bell-outline', href: '/notifications' },
        { icon: 'mdi:cog-outline', href: '/settings' },
        { icon: 'mdi:account-group', href: '/teams' },
        { icon: 'mdi:help-circle-outline', href: '/cta/help-support' }
      ]}
      sidebar={
        <Sidebar
          sidebar={[
            { label: 'All Contacts', href: '/' },
            { label: 'Favorites', href: '/favorites' },
            { label: 'Groups', href: '/groups' },
            { label: 'Shared', href: '/shared/shared-by-me' },
            { label: 'Import / Export', href: '/import-export' }
          ]}>
          {sidebarChild}
        </Sidebar>
      }>
      <Outlet />
    </Page>
  )
}
