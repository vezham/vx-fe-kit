import { createLazyFileRoute, notFound } from '@tanstack/react-router'

import { CHAT_THREADS, getChatThread } from '@/src/data/chat'
import ChatPage from '@/src/views/chat-page'

export const Route = createLazyFileRoute('/$chatId/')({
  component: RouteComponent
})

export function generateStaticParams() {
  return CHAT_THREADS.map(thread => ({ chatId: thread.id }))
}

function RouteComponent() {
  const { chatId } = Route.useParams()
  const thread = getChatThread(chatId)

  if (!thread) return notFound()
  return <ChatPage thread={thread} />
}
