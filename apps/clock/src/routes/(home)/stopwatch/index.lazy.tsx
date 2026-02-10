import { createLazyFileRoute } from '@tanstack/react-router'

import { StopWatch } from '../../../pages/stopwatch'

export const Route = createLazyFileRoute('/(home)/stopwatch/')({
  component: () => <StopWatch />
})
