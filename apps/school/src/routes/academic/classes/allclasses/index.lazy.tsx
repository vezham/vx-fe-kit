import { createLazyFileRoute } from '@tanstack/react-router'

import ClassesListTable from '../../../../pages/academic/classes/table'

export const Route = createLazyFileRoute('/academic/classes/allclasses/')({
  component: RouteComponent
})

function RouteComponent() {
  return <ClassesListTable />
}
