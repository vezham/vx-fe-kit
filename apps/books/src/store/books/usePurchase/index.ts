/* eslint-disable */
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { Api } from './action'
import { RQGetUsers, RQListUsers, RQStats } from './types'

const CK_PURCHASE = ['books', 'purchase']

const usePurchase = {
  stats: (rq: RQStats) =>
    useQuery({
      queryKey: [...CK_PURCHASE, 'stats'],
      queryFn: () => Api.stats(rq)
    }),

  list: (rq: RQListUsers) =>
    useQuery({
      queryKey: [...CK_PURCHASE, 'list'],
      queryFn: () => Api.list(rq)
    }),

  get: (rq: RQGetUsers) =>
    useQuery({
      queryKey: [...CK_PURCHASE, 'id', rq.id],
      queryFn: () => Api.get(rq)
    })
}

export function usePurchaseRefetch() {
  const queryClient = useQueryClient()
  return {
    all: () => queryClient.invalidateQueries({ queryKey: CK_PURCHASE }),
    stats: () =>
      queryClient.invalidateQueries({ queryKey: [...CK_PURCHASE, 'stats'] }),
    list: () =>
      queryClient.invalidateQueries({ queryKey: [...CK_PURCHASE, 'list'] }),
    get: (id: string | number) =>
      queryClient.invalidateQueries({ queryKey: [...CK_PURCHASE, 'id', id] })
  }
}

export { usePurchase }
