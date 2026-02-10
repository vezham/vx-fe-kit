import { createLazyFileRoute } from '@tanstack/react-router'

import ScheduleSection from '../../../pages/home/scheduled'

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
