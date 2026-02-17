import { Outlet, createLazyFileRoute } from '@tanstack/react-router'

import PageLayout from '../../components/menu/layout'
import Sidebar from '../../components/sidebar'

export const Route = createLazyFileRoute('/(home)')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <PageLayout
      menu={[
        { label: 'Home', href: '/' },
        { label: 'Notifications', href: '/notifications' },
        { label: 'Teams', href: '/teams' },
        { label: 'Settings', href: '/settings' },
        { label: 'CTA', href: '/cta' }
      ]}
      sidebar={
        <Sidebar
          sidebar={[
            { label: 'All', href: '/all' },
            { label: 'Today', href: '/today' },
            {
              label: 'Scheduled',
              href: '/scheduled'
            },
            {
              label: 'Completed',
              href: '/completed'
            },
            { label: 'Flagged', href: '/flagged' },
            { label: 'Archive', href: '/archive' }
          ]}></Sidebar>
      }>
      <Outlet />
    </PageLayout>
  )
}
