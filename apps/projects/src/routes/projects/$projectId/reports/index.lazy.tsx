import { createLazyFileRoute } from '@tanstack/react-router'

import { ProjectLayout } from '../../../../layouts/projects'

export const Route = createLazyFileRoute('/projects/$projectId/reports/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <ProjectLayout>
      <div>Reports</div>
    </ProjectLayout>
  )
}
