/* eslint-disable */
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Api } from './action'
import { RQListCashFlow } from './types'

const CK_CASHFLOW = ['reports', 'cashflow']

const selectSection = (
  data: any,
  section: 'operating' | 'investing' | 'financing'
) => {
  return data[section]
}

const useOperatingCashFlow = {
  list: (rq: RQListCashFlow) =>
    useQuery({
      queryKey: [...CK_CASHFLOW, 'operating', rq.period ?? 'monthly'],
      queryFn: async () => {
        const data = await Api.list(rq)
        return selectSection(data, 'operating') // return only operating section
      }
    })
}

const useInvestingCashFlow = {
  list: (rq: RQListCashFlow) =>
    useQuery({
      queryKey: [...CK_CASHFLOW, 'investing', rq.period ?? 'monthly'],
      queryFn: async () => {
        const data = await Api.list(rq)
        return selectSection(data, 'investing') // return only investing section
      }
    })
}

const useFinancingCashFlow = {
  list: (rq: RQListCashFlow) =>
    useQuery({
      queryKey: [...CK_CASHFLOW, 'financing', rq.period ?? 'monthly'],
      queryFn: async () => {
        const data = await Api.list(rq)
        return selectSection(data, 'financing') // return only financing section
      }
    })
}

const useCashFlowSummary = {
  list: (rq: RQListCashFlow) =>
    useQuery({
      queryKey: [...CK_CASHFLOW, 'summary', rq.period ?? 'monthly'],
      queryFn: async () => {
        const data = await Api.list(rq)
        return data.summary // return only summary
      }
    })
}

export function useCashFlowRefetch() {
  const queryClient = useQueryClient()
  return {
    all: () => queryClient.invalidateQueries({ queryKey: CK_CASHFLOW }),
    list: (period?: string) =>
      queryClient.invalidateQueries({
        queryKey: [...CK_CASHFLOW, 'list', period ?? 'monthly']
      }),
    operating: (period?: string) =>
      queryClient.invalidateQueries({
        queryKey: [...CK_CASHFLOW, 'operating', period ?? 'monthly']
      }),
    investing: (period?: string) =>
      queryClient.invalidateQueries({
        queryKey: [...CK_CASHFLOW, 'investing', period ?? 'monthly']
      }),
    financing: (period?: string) =>
      queryClient.invalidateQueries({
        queryKey: [...CK_CASHFLOW, 'financing', period ?? 'monthly']
      }),
    summary: (period?: string) =>
      queryClient.invalidateQueries({
        queryKey: [...CK_CASHFLOW, 'summary', period ?? 'monthly']
      })
  }
}

export {
  useCashFlowSummary,
  useFinancingCashFlow,
  useInvestingCashFlow,
  useOperatingCashFlow
}
