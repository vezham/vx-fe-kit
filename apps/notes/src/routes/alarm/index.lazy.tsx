import { createLazyFileRoute } from '@tanstack/react-router'

import AlarmSection from '../../pages/alarm'
import Page from '../../pages/menu/layout'
import Sidebar from '../../pages/sidebar'

export const Route = createLazyFileRoute('/alarm/')({
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
      <AlarmSection />
    </Page>
  )
}
