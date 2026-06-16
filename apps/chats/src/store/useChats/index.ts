import { useQuery } from '@tanstack/react-query'

import { Chat } from './action'
import { CHAT_THREADS } from './data'
import type { RQChat } from './types'

export * from './types'

export const CK_CHAT = 'chat'

export const useChat = {
  list: (rq: RQChat = {}) =>
    useQuery({
      queryKey: [CK_CHAT, rq],
      queryFn: () => Chat.list(rq),
      initialData: {
        threads: CHAT_THREADS
      }
    })
}
