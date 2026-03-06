import { createLazyFileRoute } from '@tanstack/react-router'

import Stopwatch from '../../pages/stopwatch'

export const Route = createLazyFileRoute('/stopwatch/')({
  component: () => <Stopwatch />
})
