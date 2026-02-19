import { createLazyFileRoute } from '@tanstack/react-router'

import { StopWatch } from '../../pages/stopwatch'

export const Route = createLazyFileRoute('/stopwatch/')({
  component: () => <StopWatch />
})
