import { createLazyFileRoute } from '@tanstack/react-router'

import { IssueSection } from '../../../../../components/issues'

export const Route = createLazyFileRoute(
  '/projects/$projectId/tasks/$taskId/issues'
)({
  component: () => <IssueSection />
})
