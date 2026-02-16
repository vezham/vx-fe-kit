import {
  Outlet,
  createLazyFileRoute,
  useMatchRoute
} from '@tanstack/react-router'

import Page from '../../components/menu/layout'
import Sidebar from '../../components/sidebar'
import ListPage from '../../pages/list'
import { useReminders } from '../../pages/reminders/store'
import Trash from '../../pages/trash'

export const Route = createLazyFileRoute('/(home)')({
  component: HomeLayout
})

function HomeLayout() {
  const matchRoute = useMatchRoute()
  const { counts } = useReminders()

  const isSettings = matchRoute({ to: '/settings', fuzzy: true })
  const isCTA = matchRoute({ to: '/cta/help-support', fuzzy: true })

  const hideSidebar = isSettings || isCTA

  return (
    <Page
      header={[
        { icon: 'mdi:cog-outline', href: '/settings' },
        { icon: 'mdi:help-circle-outline', href: '/cta/help-support' }
      ]}
      sidebar={
        hideSidebar ? null : (
          <Sidebar
            sidebar={[
              { label: 'All', href: '/all', count: counts.all },
              { label: 'Today', href: '/today', count: counts.today },
              {
                label: 'Scheduled',
                href: '/scheduled',
                count: counts.scheduled
              },
              {
                label: 'Completed',
                href: '/completed',
                count: counts.completed
              },
              { label: 'Flagged', href: '/flagged', count: counts.flagged },
              { label: 'Archive', href: '/archive', count: counts.archive }
            ]}>
            <ListPage />
            <Trash />
          </Sidebar>
        )
      }>
      <Outlet />
    </Page>
  )
}
