import { createFileRoute, redirect } from '@tanstack/react-router'

import { DEFAULT_CHAT_THREAD_ID } from '../data/data'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({
      to: `/$chatId`,
      params: {
        chatId: DEFAULT_CHAT_THREAD_ID
      }
    })
  }
})
