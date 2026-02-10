import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

import { FetchPost } from '../../../pages/posts/data'
import { PostDetail } from '../../../pages/posts/details'

export const Route = createLazyFileRoute('/posts/$postId/')({
  component: PostDetailRoute
})

function PostDetailRoute() {
  const { postId } = Route.useParams()

  const {
    data: post,
    isLoading,
    error
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => FetchPost(postId)
  })

  if (isLoading) {
    return <div>Loading post...</div>
  }

  if (error || !post) {
    return <div>Error loading post or post not found!</div>
  }

  return <PostDetail post={post} />
}
