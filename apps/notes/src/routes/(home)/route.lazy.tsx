import { Outlet, createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../components/menu/layout'

export const Route = createLazyFileRoute('/(home)')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <Page
      menu={[
        { label: 'Home', href: '/' },
        { label: 'Notifications', href: '/notifications' },
        { label: 'Teams', href: '/teams' },
        { label: 'Settings', href: '/settings' },
        { label: 'CTA', href: '/cta' }
      ]}>
      <Outlet />
    </Page>
  )
}
