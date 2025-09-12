/* eslint-disable */
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ApiAnalytics,
  ApiCard,
  ApiCashFlow,
  ApiIncome,
  ApiSales
} from './action'
import {
  RQGetCardStats,
  RQGetIncomeStatementStats,
  RQListAnalyticsStats,
  RQListCardStats,
  RQListCashFlowStats,
  RQListIncomeStatementStats,
  RQListSalesStats
} from './types'

const CK_REPORTSTATS = ['reports', 'stats']

const useReportCardStats = {
  list: (rq: RQListCardStats) =>
    useQuery({
      queryKey: [...CK_REPORTSTATS, 'cards', 'list'],
      queryFn: () => ApiCard.list(rq)
    }),

  get: (rq: RQGetCardStats) =>
    useQuery({
      queryKey: [...CK_REPORTSTATS, 'cards', 'title', rq.title],
      queryFn: () => ApiCard.get(rq)
    })
}

const useReportAnalyticsStats = {
  list: (rq: RQListAnalyticsStats) =>
    useQuery({
      queryKey: [...CK_REPORTSTATS, 'analytics', 'list'],
      queryFn: () => ApiAnalytics.list(rq)
    })
}

const useReportSalesStats = {
  list: (rq: RQListSalesStats) =>
    useQuery({
      queryKey: [...CK_REPORTSTATS, 'sales', 'list'],
      queryFn: () => ApiSales.list(rq)
    })
}

const useReportIncomeStats = {
  list: (rq: RQListIncomeStatementStats) =>
    useQuery({
      queryKey: [...CK_REPORTSTATS, 'income', 'list'],
      queryFn: () => ApiIncome.list(rq)
    }),

  get: (rq: RQGetIncomeStatementStats) =>
    useQuery({
      queryKey: [...CK_REPORTSTATS, 'income', 'title', rq.title],
      queryFn: () => ApiIncome.get(rq)
    })
}

const useReportCashFlowStats = {
  list: (rq: RQListCashFlowStats) =>
    useQuery({
      queryKey: [...CK_REPORTSTATS, 'cashflow', 'list'],
      queryFn: () => ApiCashFlow.list(rq)
    })
}

export function useReportsRefetch() {
  const queryClient = useQueryClient()
  return {
    all: () => queryClient.invalidateQueries({ queryKey: CK_REPORTSTATS }),
    list: () =>
      queryClient.invalidateQueries({
        queryKey: [...CK_REPORTSTATS, 'list']
      }),
    get: (title: string) =>
      queryClient.invalidateQueries({
        queryKey: [...CK_REPORTSTATS, 'title', title]
      })
  }
}

export {
  useReportAnalyticsStats,
  useReportCardStats,
  useReportCashFlowStats,
  useReportIncomeStats,
  useReportSalesStats
}
