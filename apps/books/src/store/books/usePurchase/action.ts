import { purchaseData, purchaseStatData } from './data'
import {
  Purchase,
  RQGetUsers,
  RQListUsers,
  RQStats,
  purchaseStats
} from './types'

const Api = {
  // api
  stats: async (_rq: RQStats): Promise<purchaseStats[]> => {
    return Promise.resolve(purchaseStatData)
  },

  list: async (_rq: RQListUsers): Promise<Purchase[]> => {
    return Promise.resolve(purchaseData)
  },

  get: async (rq: RQGetUsers): Promise<Purchase> => {
    const people = purchaseData.find(u => u.id === rq.id)
    if (!people) throw new Error('User not found')
    return Promise.resolve(people)
  }
}
export { Api }
