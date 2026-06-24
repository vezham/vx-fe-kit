import { getCurrentUserSnapshot, updateCurrentUserSnapshot } from './data'
import type { CurrentUserResponse, RQCurrentUserUpdate } from './types'

const CurrentUser = {
  get: async (): Promise<CurrentUserResponse> => {
    return Promise.resolve(getCurrentUserSnapshot())
  },

  update: async (rq: RQCurrentUserUpdate): Promise<CurrentUserResponse> => {
    return Promise.resolve(updateCurrentUserSnapshot(rq))
  }
}

export { CurrentUser }
