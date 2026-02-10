import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../pages/menu/layout'

export const Route = createLazyFileRoute('/')({
  component: () => (
    <Page
      menu={[
        { label: 'Home', href: '/' },
        { label: 'Reminders', href: '/reminders' },
        { label: 'Settings', href: '/settings' },
        { label: 'CTA', href: '/cta' }
      ]}>
      <div>Dashboard</div>
    </Page>
  )
})
