/* eslint-disable */
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Api } from './action'
import { RQGetUsers, RQListUsers, RQStats } from './types'

const CK_SALES = ['books', 'sales']

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

export function useSalesRefetch() {
  const queryClient = useQueryClient()
  return {
    all: () => queryClient.invalidateQueries({ queryKey: CK_SALES }),
    stats: () =>
      queryClient.invalidateQueries({ queryKey: [...CK_SALES, 'stats'] }),
    list: () =>
      queryClient.invalidateQueries({ queryKey: [...CK_SALES, 'list'] }),
    get: (id: string | number) =>
      queryClient.invalidateQueries({ queryKey: [...CK_SALES, 'id', id] })
  }
}

export { useSales }
