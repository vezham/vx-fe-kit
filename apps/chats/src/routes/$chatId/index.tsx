import { createFileRoute, notFound } from '@tanstack/react-router'

import ChatPage from '@/src/pages/chat'
import { CHAT_THREADS } from '@/src/store/useChats/data'
import { getChatThread } from '@/src/utils/chat'

export const Route = createFileRoute('/$chatId/')({
  beforeLoad: ({ params }) => {
    const thread = getChatThread(params.chatId)

    if (!thread) {
      throw notFound()
    }

    return { thread }
  },

  component: RouteComponent
})

function RouteComponent() {
  const { thread } = Route.useRouteContext()

  return <ChatPage thread={thread} />
}

// =========================================================== loader ===========================

// export const Route = createFileRoute('/$chatId/')({
//   loader: ({ params }) => {
//     const thread = getChatThread(params.chatId)

//     if (!thread) {
//       throw notFound()
//     }

//     return { thread }
//   },

//   component: RouteComponent,
// })

// function RouteComponent() {
//   const { thread } = Route.useLoaderData()

//   return <ChatPage thread={thread} />
// }
