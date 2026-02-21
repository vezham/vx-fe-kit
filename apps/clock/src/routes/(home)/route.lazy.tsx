// routes/(home)/route.lazy.tsx
import {
  Outlet,
  createLazyFileRoute,
  useMatchRoute
} from '@tanstack/react-router'

import Page from '../../components/menu/layout'

export const Route = createLazyFileRoute('/(home)')({
  component: HomeLayout
})

function HomeLayout() {
  return (
    <Page
      menu={[
        { label: 'Worldclock', href: '/' },
        { label: 'Alarm', href: '/alarm' },
        { label: 'Stopwatch', href: '/stopwatch' },
        { label: 'Timer', href: '/timer' },
        { label: 'Widgets', href: '/widgets' }
      ]}>
      <Outlet />
    </Page>
  )
}
