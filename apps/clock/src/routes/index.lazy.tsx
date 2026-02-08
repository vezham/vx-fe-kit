import { createLazyFileRoute } from '@tanstack/react-router'

import Home from '../pages/home'
import Page from '../pages/menu'

export const Route = createLazyFileRoute('/')({
  // component: () => <Home />
  component: () => (
    <Page
      menu={[
        { label: 'Worldclock', href: '/worldclock' },
        { label: 'Alarm', href: '/alarm' },
        { label: 'Stopwatch', href: '/stopwatch' },
        { label: 'Timer', href: '/timer' }
      ]}
    />
  )
})
