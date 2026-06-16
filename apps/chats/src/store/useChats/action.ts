import { CHAT_THREADS } from './data'
import type { ChatResponse, RQChat } from './types'

const Chat = {
  list: async (_rq: RQChat): Promise<ChatResponse> => {
    return Promise.resolve({
      threads: CHAT_THREADS
    })
  }
}

export { Chat }
