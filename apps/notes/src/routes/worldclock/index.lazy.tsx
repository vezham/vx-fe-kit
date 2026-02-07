import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../pages/menu/layout'
import Sidebar from '../../pages/sidebar'
import Worldclock from '../../pages/worldclock'
import WorldclockURL from '../../pages/worldclock/worldClockUrl'

export const Route = createLazyFileRoute('/worldclock/')({
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
      {/* <Worldclock /> */}
      <WorldclockURL />
    </Page>
  )
}
