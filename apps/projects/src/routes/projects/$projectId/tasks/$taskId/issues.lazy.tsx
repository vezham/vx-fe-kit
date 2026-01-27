import { createLazyFileRoute } from '@tanstack/react-router'

import { IssueSection } from '../../../../../layouts/projects/issues'

export const Route = createLazyFileRoute(
  '/projects/$projectId/tasks/$taskId/issues'
)({
  component: () => <IssueSection />
})
