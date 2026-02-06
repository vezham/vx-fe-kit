import { Outlet, createLazyFileRoute } from '@tanstack/react-router'

import { ProjectLayout } from '../../../../layouts/projects'
import { ProjectTask } from '../../../../layouts/tasks'

export const Route = createLazyFileRoute('/projects/$projectId/tasks/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <ProjectLayout>
        <ProjectTask />
      </ProjectLayout>
    </div>
  )
}
