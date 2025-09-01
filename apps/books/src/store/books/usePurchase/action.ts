import { purchaseStatData, purchaseUsers } from './data'
import {
  purchaseStats,
  purchaseUserProps,
  RQGetPurchaseStats,
  RQGetUser,
  RQListPurchaseStats,
  RQListUsers
} from './types'

const purchaseUsersApi = {
  list: async (_rq: RQListUsers): Promise<purchaseUserProps[]> => {
    // mock API call
    return Promise.resolve(purchaseUsers)
  },
  get: async (rq: RQGetUser): Promise<purchaseUserProps> => {
    const user = purchaseUsers.find(u => u.id === rq.id)
    if (!user) throw new Error('User not found')
    return Promise.resolve(user)
  }
}

const PurchaseStatsApi = {
  list: async (_rq: RQListPurchaseStats): Promise<purchaseStats[]> => {
    return Promise.resolve(purchaseStatData)
  },
  get: async (rq: RQGetPurchaseStats): Promise<purchaseStats> => {
    const stat = purchaseStatData.find(u => u.id === rq.id)
    if (!stat) throw new Error('Stat not found')
    return Promise.resolve(stat)
  }
}
export { PurchaseStatsApi, purchaseUsersApi }
