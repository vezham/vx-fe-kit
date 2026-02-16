import { createLazyFileRoute } from '@tanstack/react-router'

import ScheduleSection from '../../../pages/scheduled'

export const Route = createLazyFileRoute('/(home)/scheduled/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <ScheduleSection />
    </div>
  )
}
