import { createLazyFileRoute } from '@tanstack/react-router'

import { NewChatPage } from '@/src/views/new-chat-page'

export const Route = createLazyFileRoute('/new/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <NewChatPage />
    </div>
  )
}
