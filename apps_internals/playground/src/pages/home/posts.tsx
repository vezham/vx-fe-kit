import { usePosts } from '../../store/usePosts'

const Posts = () => {
  const { status, data, error, isFetching } = usePosts()

  return (
    <div>
      {status === 'pending' ? (
        'Loading...'
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div>
            {data.map(post => (
              <p key={post.id}>
                <a data-id={post.id} href={`/posts/${post.id}`}>
                  {post.title}
                </a>
              </p>
            ))}
          </div>
          <div>{isFetching ? 'Background Updating...' : ' '}</div>
        </>
      )}
    </div>
  )
}

export default Posts
