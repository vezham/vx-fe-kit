import { createLazyFileRoute } from '@tanstack/react-router'

import { NewChatPage } from '@/src/pages/new-chat'

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
