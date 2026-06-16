import { THREADS } from './data'
import type { EmailResponse, RQEmail } from './types'

const Email = {
  list: async (rq: RQEmail): Promise<EmailResponse> => {
    let threads = THREADS

    if (rq.folderId === 'starred') {
      threads = threads.filter(thread => thread.isStarred)
    } else if (rq.folderId) {
      threads = threads.filter(thread => thread.folderId === rq.folderId)
    }

    return Promise.resolve({
      threads
    })
  }
}

export { Email }
