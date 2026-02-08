import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../pages/menu/layout'
import Sidebar from '../../pages/sidebar'
import WorldClockLocal from '../../pages/worldclock'
import WorldClockQuery from '../../pages/worldclock/query_state'
import WorldClockURL from '../../pages/worldclock/url_state'

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
      <WorldClockLocal />
      {/* <WorldClockURL /> */}
      {/* <WorldClockQuery/> */}
    </Page>
  )
}
