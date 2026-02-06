import { createLazyFileRoute } from '@tanstack/react-router'

import { ProjectLayout } from '../../../../layouts/projects'
import { ProjectDetails } from '../../../../layouts/projects/project-details'
import { useProjects } from '../../../../store/useProjects'

export const Route = createLazyFileRoute('/projects/$projectId/overview/')({
  component: OverviewPage,
  pendingComponent: () => <div>Loading...</div>
})

function OverviewPage() {
  const { projectId } = Route.useParams()
  const { data: projects, isLoading } = useProjects()

  if (isLoading) {
    return <div>Loading project...</div>
  }

  if (!projects || projects.length === 0) {
    return <div>No projects found</div>
  }

  const project = projects.find(p => p.projectsId === Number(projectId))

  if (!project) {
    return (
      <div className="p-6">
        <div className="text-default-500">Project not found</div>
      </div>
    )
  }

  return (
    <ProjectLayout>
      <ProjectDetails project={project} />
    </ProjectLayout>
  )
}
