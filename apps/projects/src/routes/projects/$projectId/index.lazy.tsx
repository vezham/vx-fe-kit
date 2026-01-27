import {
  createLazyFileRoute,
  useNavigate,
  useParams
} from '@tanstack/react-router'

import { ProjectDetails } from '../../../layouts/projects/ProjectDetails'
import { useDeleteProject, useProjects } from '../../../store/useProjects'

export const Route = createLazyFileRoute('/projects/$projectId/')({
  component: ProjectOverview
})

function ProjectOverview() {
  const navigate = useNavigate()
  const { projectId } = useParams({ from: '/projects/$projectId/' })
  const { data: projects = [], isLoading } = useProjects()
  const { mutate: deleteProject } = useDeleteProject()

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-default-500">Loading project details...</div>
      </div>
    )
  }

  // If no projects or invalid projectId, redirect to projects list
  if (!projects.length || !projectId) {
    navigate({ to: '/projects' })
    return null
  }

  const project = projects.find(p => p.projectsId === Number(projectId))

  // If project not found, redirect to first project
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

  return (
    <ProjectDetails
      project={project}
      onBack={() => navigate({ to: '/projects' })}
      onDelete={() =>
        deleteProject(project.projectsId, {
          onSuccess: () => navigate({ to: '/projects' })
        })
      }
    />
  )
}
