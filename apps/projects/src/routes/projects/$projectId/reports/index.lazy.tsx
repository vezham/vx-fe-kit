import { createLazyFileRoute } from '@tanstack/react-router'

import ProjectReports from '../../../../pages/projects/ProjectReports'

export const Route = createLazyFileRoute('/projects/$projectId/reports/')({
  component: () => <ProjectReports />
})
