import { PORTFOLIO_RANGES } from './index'
import type { PortfolioResponse, RQPortfolio } from './types'

const Portfolio = {
  list: async (_rq: RQPortfolio): Promise<PortfolioResponse> => {
    return Promise.resolve({
      ranges: [...PORTFOLIO_RANGES]
    })
  }
}

export { Portfolio }
