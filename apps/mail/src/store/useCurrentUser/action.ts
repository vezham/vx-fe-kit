import { CURRENT_USER } from './data'
import type { CurrentUserResponse } from './types'

const CurrentUser = {
  get: async (): Promise<CurrentUserResponse> => {
    return Promise.resolve(CURRENT_USER)
  }
}

export { CurrentUser }
