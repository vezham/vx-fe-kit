import { createLazyFileRoute } from '@tanstack/react-router'

import ScheduleSection from '../../../pages/reminders/scheduled'

export const Route = createLazyFileRoute('/reminders/scheduled/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <ScheduleSection />
    </div>
  )
}
