import { createLazyFileRoute } from '@tanstack/react-router'

import SchedulePage from '../../../../pages/academic1/classes/schedule'

export const Route = createLazyFileRoute('/academic1/classes/schedule/')({
  component: SchedulePage
})
