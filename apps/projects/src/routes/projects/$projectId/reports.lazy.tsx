import { createLazyFileRoute } from '@tanstack/react-router'

import ProjectReports from '../../../layouts/projects/ProjectReports'

export const Route = createLazyFileRoute('/projects/$projectId/reports')({
  component: () => <ProjectReports />
})
