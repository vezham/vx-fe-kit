/* eslint-disable */
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { Api } from './action'
import { RQGetBalanceSheet, RQListBalanceSheet } from './types'

const CK_BALANCESHEET = ['reports', 'balance_sheet']

const useBalanceSheet = {
  list: (rq: RQListBalanceSheet) =>
    useQuery({
      queryKey: [...CK_BALANCESHEET, 'list', rq.period ?? 'monthly'],
      queryFn: () => Api.list(rq)
    }),

  get: (rq: RQGetBalanceSheet) =>
    useQuery({
      queryKey: [...CK_BALANCESHEET, 'id', rq.category, rq.period ?? 'monthly'],
      queryFn: () => Api.get(rq)
    })
}

export function useBalanceSheetRefetch() {
  const queryClient = useQueryClient()
  return {
    all: () => queryClient.invalidateQueries({ queryKey: CK_BALANCESHEET }),
    list: (period?: string) =>
      queryClient.invalidateQueries({
        queryKey: [...CK_BALANCESHEET, 'list', period ?? 'monthly']
      }),
    get: (category: string | number, period?: string) =>
      queryClient.invalidateQueries({
        queryKey: [
          ...CK_BALANCESHEET,
          'category',
          category,
          period ?? 'monthly'
        ]
      })
  }
}

export { useBalanceSheet }
