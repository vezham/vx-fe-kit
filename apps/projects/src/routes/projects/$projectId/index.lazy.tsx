import {
  createLazyFileRoute,
  useNavigate,
  useParams
} from '@tanstack/react-router'

import { ProjectDetails } from '../../../layouts/projects/ProjectDetails'
import { useDeleteProject, useProjectList } from '../../../store/useProjects'

export const Route = createLazyFileRoute('/projects/$projectId/')({
  component: ProjectOverview
})

function ProjectOverview() {
  const navigate = useNavigate()
  const { projectId } = useParams({ from: '/projects/$projectId/' })

  const { data: projects = [] } = useProjectList({})
  const { mutate: deleteProject } = useDeleteProject()

  const project = projects.find(p => p.id === Number(projectId))
  if (!project) return null

  return (
    <ProjectDetails
      project={project}
      onBack={() => navigate({ to: '/projects' })}
      onDelete={() =>
        deleteProject(project.id, {
          onSuccess: () => navigate({ to: '/projects' })
        })
      }
    />
  )
}
