/* eslint-disable */
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Api } from './action'
import { RQGetProfitLoss, RQListProfitLoss } from './types'

const CK_PROFITLOSS = ['reports', 'profit_loss']

const useProfitLoss = {
  list: (rq: RQListProfitLoss) =>
    useQuery({
      queryKey: [...CK_PROFITLOSS, 'list', rq.period ?? 'monthly'],
      queryFn: () => Api.list(rq)
    }),

  get: (rq: RQGetProfitLoss) =>
    useQuery({
      queryKey: [...CK_PROFITLOSS, 'id', rq.category, rq.period ?? 'monthly'],
      queryFn: () => Api.get(rq)
    })
}

export function useProfitLossRefetch() {
  const queryClient = useQueryClient()
  return {
    all: () => queryClient.invalidateQueries({ queryKey: CK_PROFITLOSS }),
    list: (period?: string) =>
      queryClient.invalidateQueries({
        queryKey: [...CK_PROFITLOSS, 'list', period ?? 'monthly']
      }),
    get: (category: string, period?: string) =>
      queryClient.invalidateQueries({
        queryKey: [...CK_PROFITLOSS, 'category', category, period ?? 'monthly']
      })
  }
}

export { useProfitLoss }
