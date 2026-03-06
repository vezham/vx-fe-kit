import { mockDataByPeriod } from './data'
import { FinancialData, RQGetProfitLoss, RQListProfitLoss } from './types'

const Api = {
  list: async (rq: RQListProfitLoss): Promise<FinancialData[]> => {
    const period = rq.period ?? 'monthly'
    return Promise.resolve(mockDataByPeriod[period])
  },

  get: async (rq: RQGetProfitLoss): Promise<FinancialData> => {
    const period = rq.period ?? 'monthly'
    const data = mockDataByPeriod[period]
    const item = data.find(d => d.category === rq.category)
    if (!item) {
      throw new Error(`Profit & Loss record not found for ${rq.category}`)
    }
    return Promise.resolve(item)
  }
}

export { Api }
