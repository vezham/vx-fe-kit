/* eslint-disable */
import { useQuery } from '@tanstack/react-query'
import { salesStatsApi, salesUserApi } from './action'
import {
  RQGetSalesStats,
  RQGetUser,
  RQListSalesStats,
  RQListUsers
} from './types'

const CK_SALESUSERS = 'users'
const CK_SALESSTATS = 'sales'

const useSalesUsers = {
  list: (rq: RQListUsers) =>
    useQuery({
      queryKey: [CK_SALESUSERS, rq],
      queryFn: () => salesUserApi.list(rq)
    }),
  get: (rq: RQGetUser) =>
    useQuery({
      queryKey: [CK_SALESUSERS, rq.id, rq],
      queryFn: () => salesUserApi.get(rq)
    })
}

const useSalesStats = {
  list: (rq: RQListSalesStats) =>
    useQuery({
      queryKey: [CK_SALESSTATS, rq],
      queryFn: () => salesStatsApi.list(rq)
    }),
  get: (rq: RQGetSalesStats) =>
    useQuery({
      queryKey: [CK_SALESSTATS, rq.id, rq],
      queryFn: () => salesStatsApi.get(rq)
    })
}

export { useSalesStats, useSalesUsers }
