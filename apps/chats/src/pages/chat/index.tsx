'use client'

import { ChatConversation } from '@heroui-pro/react'

import { ChatComposer } from '@/src/components/chat-composer'
import { ThreadMessage } from '@/src/components/thread-message'
import { ChatThread } from '@/src/store/useChats/types'

export interface ChatPageProps {
  thread: ChatThread
}

export default function ChatPage({ thread }: ChatPageProps) {
  return (
    <div className="bg-background flex h-[calc(100svh-var(--chat-navbar-height,64px))] flex-col overflow-hidden">
      <ChatConversation className="min-h-0 flex-1">
        <ChatConversation.Content className="flex flex-col">
          <div className="mx-auto flex w-full max-w-[714px] flex-col gap-8 px-4 pt-10 pb-6">
            {thread.messages.map(message => (
              <ThreadMessage key={message.id} message={message} />
            ))}
          </div>
          <ChatConversation.ScrollAnchor />
        </ChatConversation.Content>
      </ChatConversation>

      <div className="bg-background shrink-0 px-4 pt-3 pb-4">
        <div className="mx-auto w-full max-w-[714px]">
          <ChatComposer className="w-full" modelId={thread.modelId} />
        </div>
      </div>
    </div>
  )
}
