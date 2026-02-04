import { createLazyFileRoute } from '@tanstack/react-router'

import { ProjectDetails } from '../../../../layouts/projects/project-details'
import { useProjects } from '../../../../store/useProjects'

export const Route = createLazyFileRoute('/projects/$projectId/overview/')({
  component: OverviewPage
})

function OverviewPage() {
  const { projectId } = Route.useParams()
  const { data: projects = [], isLoading } = useProjects()

  if (isLoading) return <div>Loading...</div>

  const project = projects.find(p => p.projectsId === Number(projectId))

  if (!project) return <div>Project not found</div>

  return <ProjectDetails project={project} />
}
