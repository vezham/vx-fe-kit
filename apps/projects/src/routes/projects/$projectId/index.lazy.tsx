import { createLazyFileRoute, redirect } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/projects/$projectId/')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/projects/$projectId/overview',
      params: { projectId: params.projectId }
    })
  }
})
