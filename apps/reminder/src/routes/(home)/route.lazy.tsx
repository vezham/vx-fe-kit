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
  const isCTA = matchRoute({ to: '/cta/help-support', fuzzy: true })

  const hideSidebar = isSettings || isCTA

  return (
    <Page
      menu={[
        { label: 'Home', href: '/' },
        { label: 'Settings', href: '/settings' },
        { label: 'CTA', href: '/cta' }
      ]}
      sidebar={
        hideSidebar ? null : (
          <Sidebar
            sidebar={[
              { label: 'All', href: '/all' },
              { label: 'Today', href: '/today' },
              { label: 'Scheduled', href: '/scheduled' },
              { label: 'Completed', href: '/completed' },
              { label: 'Flagged', href: '/flagged' },
              { label: 'Archive', href: '/archive' }
            ]}
          />
        )
      }>
      <Outlet />
    </Page>
  )
}
