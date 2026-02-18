import type { ErrorComponentProps } from '@tanstack/react-router'
import { ErrorComponent, createFileRoute } from '@tanstack/react-router'

import { fetchPost } from '../../../store/usePosts'

export const Route = createFileRoute('/posts/$postId/')({
  loader: async ({ params: { postId } }) => fetchPost(postId),
  pendingComponent: () => {
    return <div>Loading...</div>
  },
  notFoundComponent: () => {
    return <div>Post not found</div>
  },
  errorComponent: ({ error }: ErrorComponentProps) => {
    return <ErrorComponent error={error} />
  },
  component: PostComponent
})

function PostComponent() {
  const post = Route.useLoaderData()

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{post.title}</h4>
      <div className="text-sm">{post.body}</div>
    </div>
  )
}
