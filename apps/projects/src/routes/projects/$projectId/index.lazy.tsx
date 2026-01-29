import {
  createLazyFileRoute,
  useNavigate,
  useParams
} from '@tanstack/react-router'

import { ProjectDetails } from '../../../components/projects/project-details'
import { useProjects } from '../../../store/useProjects'

export const Route = createLazyFileRoute('/projects/$projectId/')({
  component: ProjectOverview
})

function ProjectOverview() {
  const navigate = useNavigate()
  const { projectId } = useParams({ from: '/projects/$projectId/' })
  const { data: projects = [], isLoading } = useProjects()

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-default-500">Loading project details...</div>
      </div>
    )
  }

  if (!projects.length || !projectId) {
    navigate({ to: '/projects' })
    return null
  }
  const project = projects.find(p => p.projectsId === Number(projectId))

  if (!project) {
    if (projects.length > 0) {
      navigate({
        to: '/projects/$projectId',
        params: { projectId: projects[0].projectsId },
        replace: true
      })
    } else {
      navigate({ to: '/projects' })
    }
    return null
  }
  return <ProjectDetails project={project} />
}
