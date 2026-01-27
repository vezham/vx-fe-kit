import { createLazyFileRoute } from '@tanstack/react-router'

import { CommentSection } from '../../../../../layouts/projects/comments'

export const Route = createLazyFileRoute(
  '/projects/$projectId/tasks/$taskId/comments'
)({
  component: () => <CommentSection />
})
