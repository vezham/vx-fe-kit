import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '../../../pages/menu/layout'
import Sidebar from '../../../pages/sidebar'
import DetailPage from '../../../pages/worldclock/details'

export const Route = createLazyFileRoute('/worldclock/$clockId/')({
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
      <DetailPage />
    </Page>
  )
}
