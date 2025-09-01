/* eslint-disable */
import { useQuery } from '@tanstack/react-query'
import { PurchaseStatsApi, purchaseUsersApi } from './action'
import {
  RQGetPurchaseStats,
  RQGetUser,
  RQListPurchaseStats,
  RQListUsers
} from './types'

const CK_PURCHASEUSERS = 'users'
const CK_PURCHASESTATS = 'purchase'

const usePurchaseUsers = {
  list: (rq: RQListUsers) =>
    useQuery({
      queryKey: [CK_PURCHASEUSERS, rq],
      queryFn: () => purchaseUsersApi.list(rq)
    }),
  get: (rq: RQGetUser) =>
    useQuery({
      queryKey: [CK_PURCHASEUSERS, rq.id, rq],
      queryFn: () => purchaseUsersApi.get(rq)
    })
}

const usePurchaseStats = {
  list: (rq: RQListPurchaseStats) =>
    useQuery({
      queryKey: [CK_PURCHASESTATS, rq],
      queryFn: () => PurchaseStatsApi.list(rq)
    }),
  get: (rq: RQGetPurchaseStats) =>
    useQuery({
      queryKey: [CK_PURCHASESTATS, rq.id, rq],
      queryFn: () => PurchaseStatsApi.get(rq)
    })
}

export { usePurchaseStats, usePurchaseUsers }
