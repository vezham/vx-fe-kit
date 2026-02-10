// routes/(home)/route.lazy.tsx
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
  const isHome = matchRoute({ to: '/', fuzzy: false })

  return (
    <Page
      menu={[
        { label: 'Worldclock', href: '/worldclock' },
        { label: 'Alarm', href: '/alarm' },
        { label: 'Stopwatch', href: '/stopwatch' },
        { label: 'Timer', href: '/timer' }
      ]}
      sidebar={isHome ? null : <Sidebar />}>
      <Outlet />
    </Page>
  )
}
