import { Navigate, createLazyFileRoute } from '@tanstack/react-router'

import { useProjectList } from '../../store/useProjects'

export const Route = createLazyFileRoute('/projects/')({
  component: ProjectsIndex
})

function ProjectsIndex() {
  const { data: projects = [] } = useProjectList({})

  if (!projects.length) return null

  return (
    <Navigate
      to="/projects/$projectId"
      params={{ projectId: projects[0].id }}
      replace
    />
  )
}
