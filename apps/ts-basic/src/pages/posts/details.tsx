import { PostType } from './data'

type Props = {
  post: PostType
}

export function PostDetail({ post }: Props) {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  )
}
