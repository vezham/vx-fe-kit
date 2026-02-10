import { Link } from '@tanstack/react-router'

import { PostType } from './data'

type Props = {
  posts: PostType[]
}

export function PostsList({ posts }: Props) {
  return (
    <div style={{ width: 300 }}>
      <h2>Posts</h2>

      {posts.length === 0 ? (
        <div>No posts found</div>
      ) : (
        posts.map(post => (
          <div key={post.id}>
            <Link
              to="/posts/$postId"
              params={{ postId: post.id }}
              activeProps={{ className: 'font-bold' }}>
              {post.title}
            </Link>
          </div>
        ))
      )}
    </div>
  )
}
