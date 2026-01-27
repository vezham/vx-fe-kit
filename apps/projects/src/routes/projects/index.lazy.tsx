import { Navigate, createLazyFileRoute } from '@tanstack/react-router'

import { useProjects } from '../../store/useProjects'

export const Route = createLazyFileRoute('/projects/')({
  component: ProjectsIndex
})

function ProjectsIndex() {
  const { data: projects = [], isLoading } = useProjects()

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-default-500">Loading...</div>
      </div>
    )
  }

  // Redirect to first project if projects exist
  if (projects.length > 0) {
    return (
      <Navigate
        to="/projects/$projectId"
        params={{ projectId: projects[0].projectsId }}
        replace
      />
    )
  }

  // Show empty state if no projects
  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <div className="text-default-500 mb-4 text-center">
        No projects found. Select a project from the sidebar or create a new
        one.
      </div>
    </div>
  )
}
