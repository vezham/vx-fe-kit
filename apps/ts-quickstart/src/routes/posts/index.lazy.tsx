// posts/index.lazy.tsx
import { useQuery } from '@tanstack/react-query'
import { Outlet, createLazyFileRoute } from '@tanstack/react-router'

import { PostsList } from '../../pages/posts'
import { FetchPosts } from '../../pages/posts/data'

export const Route = createLazyFileRoute('/posts/')({
  component: PostsRoute
})

function PostsRoute() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: FetchPosts
  })

  if (isLoading) {
    return <div>Loading posts...</div>
  }

  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <PostsList posts={posts || []} />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  )
}
