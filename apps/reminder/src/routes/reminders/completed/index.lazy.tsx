import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/menu/layout'
import Sidebar from '../../../pages/sidebar'

export const Route = createLazyFileRoute('/reminders/completed/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      {' '}
      <Page
        menu={[
          { label: 'Home', href: '/' },
          { label: 'Reminders', href: '/reminders' },
          { label: 'Settings', href: '/settings' },
          { label: 'CTA', href: '/cta' }
        ]}
        sidebar={
          <Sidebar
            sidebar={[
              { label: 'All', href: '/reminders/all' },
              { label: 'Today', href: '/reminders/today' },
              { label: 'Scheduled', href: '/reminders/scheduled' },
              { label: 'Completed', href: '/reminders/completed' },
              { label: 'Flagged', href: '/reminders/flagged' },
              { label: 'Archive', href: '/reminders/archive' }
            ]}
          />
        }>
        Completed
      </Page>
    </div>
  )
}
