import {
  financingData,
  investingData,
  operatingData,
  summaryData
} from './data'

import {
  CashFlowData,
  RQGetCashFlow,
  RQListCashFlow,
  cashFlowPeriod
} from './types'

const Api = {
  // Return the full data object (all sections) for a given period
  list: async (rq: RQListCashFlow): Promise<CashFlowData> => {
    const period: cashFlowPeriod = rq.period ?? 'monthly'
    return Promise.resolve({
      operating: operatingData[period],
      investing: investingData[period],
      financing: financingData[period],
      summary: summaryData[period]
    })
  },

  // Return a single section by title
  get: async (rq: RQGetCashFlow): Promise<CashFlowData[keyof CashFlowData]> => {
    const period: cashFlowPeriod = rq.period ?? 'monthly'

    const sections: CashFlowData = {
      operating: operatingData[period],
      investing: investingData[period],
      financing: financingData[period],
      summary: summaryData[period]
    }

    const section = sections[rq.title as keyof CashFlowData]
    if (!section) throw new Error(`Cash Flow section not found: ${rq.title}`)
    return Promise.resolve(section)
  }
}

export { Api }
