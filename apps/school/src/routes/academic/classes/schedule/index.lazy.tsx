import { createLazyFileRoute } from '@tanstack/react-router'

import ScheduleListTable from '../../../../pages/academic/schedule/table'

export const Route = createLazyFileRoute('/academic/classes/schedule/')({
  component: RouteComponent
})

function RouteComponent() {
  return <ScheduleListTable />
}
