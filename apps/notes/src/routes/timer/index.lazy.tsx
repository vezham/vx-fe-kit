import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../pages/menu/layout'
import Sidebar from '../../pages/sidebar'
import TimerSection from '../../pages/timer'

export const Route = createLazyFileRoute('/timer/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <Page
      sidebar={<Sidebar />}
      menu={[
        { label: 'Worldclock', href: '/worldclock' },
        { label: 'Alarm', href: '/alarm' },
        { label: 'Stopwatch', href: '/stopwatch' },
        { label: 'Timer', href: '/timer' }
      ]}>
      <TimerSection />
    </Page>
  )
}
