import { EARN_OPPORTUNITIES } from './data'
import type { EarnResponse, RQEarn } from './types'

const Earn = {
  list: async (_rq: RQEarn): Promise<EarnResponse> => {
    return Promise.resolve({
      opportunities: [...EARN_OPPORTUNITIES]
    })
  }
}

export { Earn }
