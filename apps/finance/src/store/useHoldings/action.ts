import { HOLDINGS } from './data'
import type { HoldingsResponse, RQHoldings } from './types'

const Holdings = {
  list: async (_rq: RQHoldings): Promise<HoldingsResponse> => {
    return Promise.resolve({
      holdings: [...HOLDINGS]
    })
  }
}

export { Holdings }
