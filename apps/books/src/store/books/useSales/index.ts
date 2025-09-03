/* eslint-disable */
import { useQuery } from '@tanstack/react-query'
import { Api } from './action'
import { RQGetUsers, RQListUsers, RQStats } from './types'

export const CK_SALES = ['books', 'sales']

const useSales = {
  stats: (rq: RQStats) =>
    useQuery({
      queryKey: [...CK_SALES, 'stats'],
      queryFn: () => Api.stats(rq)
    }),

  list: (rq: RQListUsers) =>
    useQuery({
      queryKey: [...CK_SALES, 'list'],
      queryFn: () => Api.list(rq)
    }),

  get: (rq: RQGetUsers) =>
    useQuery({
      queryKey: [...CK_SALES, 'id', rq.id],
      queryFn: () => Api.get(rq)
    })
}

export { useSales }
