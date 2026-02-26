import { createLazyFileRoute } from '@tanstack/react-router'

import Worldclock from '../pages/worldclock'
import WorldClockQuery from '../pages/worldclock/query_state'
import WorldClockURL from '../pages/worldclock/url_state'

export const Route = createLazyFileRoute('/')({
  component: () => <Worldclock />
  // component: () => <WorldClockURL />
  // component: () => <WorldClockQuery />
})
