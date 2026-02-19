import { createLazyFileRoute } from '@tanstack/react-router'

import { TimerSection } from '../../pages/timer'

export const Route = createLazyFileRoute('/timer/')({
  component: () => <TimerSection />
})
