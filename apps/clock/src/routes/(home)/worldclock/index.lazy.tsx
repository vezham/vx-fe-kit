import { createLazyFileRoute } from '@tanstack/react-router'

import WorldClockLocal from '../../../pages/worldclock'

// import WorldClockQuery from '../../pages/worldclock/query_state'
// import WorldClockURL from '../../pages/worldclock/url_state'

export const Route = createLazyFileRoute('/(home)/worldclock/')({
  component: () => <WorldClockLocal />
  // component: () => <WorldClockURL />
  // component: () => <WorldClockQuery />
})
