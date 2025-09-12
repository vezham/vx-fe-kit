import { mockDataByPeriod } from './data'

import { FinancialData, RQGetBalanceSheet, RQListBalanceSheet } from './types'

const Api = {
  list: async (rq: RQListBalanceSheet): Promise<FinancialData[]> => {
    const period = rq.period ?? 'monthly'
    return Promise.resolve(mockDataByPeriod[period])
  },

  // Return a single row by category for a given period
  get: async (rq: RQGetBalanceSheet): Promise<FinancialData> => {
    const period = rq.period ?? 'monthly'
    const data = mockDataByPeriod[period]
    const item = data.find(d => d.category === rq.category)
    if (!item)
      throw new Error(`Profit & Loss record not found for ${rq.category}`)
    return Promise.resolve(item)
  }
}

export { Api }
