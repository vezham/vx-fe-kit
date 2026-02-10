import { createLazyFileRoute } from '@tanstack/react-router'

import { TimerSection } from '../../../pages/timer'

export const Route = createLazyFileRoute('/(home)/timer/')({
  component: () => <TimerSection />
})
