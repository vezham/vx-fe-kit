/* eslint-disable */
import {
  cardData,
  cashFlowData,
  financialRows,
  fullChartData,
  salesData
} from './data'
import {
  CardData,
  ChartData,
  FinancialRowProps,
  RQGetCardStats,
  RQGetIncomeStatementStats,
  RQListAnalyticsStats,
  RQListCardStats,
  RQListCashFlowStats,
  RQListIncomeStatementStats,
  RQListSalesStats,
  SalesData,
  YearlyData
} from './types'

/* ================================
   CARD STATS
================================ */
const ApiCard = {
  list: async (_rq?: RQListCardStats): Promise<CardData[]> => {
    return Promise.resolve(cardData)
  },
  get: async (rq?: RQGetCardStats): Promise<CardData> => {
    if (!rq || !rq.title) {
      throw new Error('Missing request payload for ApiCard.get')
    }
    const item = cardData.find(c => c.title === rq.title)
    if (!item) {
      throw new Error(`Card stats not found for ${rq.title}`)
    }
    return Promise.resolve(item)
  }
}

/* ================================
   ANALYTICS STATS
================================ */
const ApiAnalytics = {
  list: async (_rq: RQListAnalyticsStats): Promise<ChartData[]> => {
    return Promise.resolve(fullChartData)
  }
}

/* ================================
   SALES STATS
================================ */
const ApiSales = {
  list: async (_rq: RQListSalesStats): Promise<SalesData> => {
    return Promise.resolve(salesData)
  }
}

/* ================================
   INCOME STATEMENT STATS
================================ */
const ApiIncome = {
  list: async (
    _rq: RQListIncomeStatementStats
  ): Promise<FinancialRowProps[]> => {
    return Promise.resolve(financialRows)
  },
  get: async (rq: RQGetIncomeStatementStats): Promise<FinancialRowProps> => {
    const item = financialRows.find(f => f.label === rq.title)
    if (!item) {
      throw new Error(`Income statement not found for ${rq.title}`)
    }
    return Promise.resolve(item)
  }
}

/* ================================
   CASHFLOW STATS
================================ */
const ApiCashFlow = {
  list: async (_rq: RQListCashFlowStats): Promise<YearlyData[]> => {
    return Promise.resolve(cashFlowData)
  }
}

export { ApiAnalytics, ApiCard, ApiCashFlow, ApiIncome, ApiSales }
