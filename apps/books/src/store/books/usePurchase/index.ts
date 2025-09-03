/* eslint-disable */
import { useQuery } from '@tanstack/react-query'
import { Api } from './action'
import { RQGetUsers, RQListUsers, RQStats } from './types'

export const CK_PURCHASE = ['books', 'purchase']

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

export { usePurchase }
