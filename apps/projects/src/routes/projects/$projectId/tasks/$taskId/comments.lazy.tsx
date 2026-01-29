import { createLazyFileRoute } from '@tanstack/react-router'

import { CommentSection } from '../../../../../components/comments'

export const Route = createLazyFileRoute(
  '/projects/$projectId/tasks/$taskId/comments'
)({
  component: () => <CommentSection />
})
