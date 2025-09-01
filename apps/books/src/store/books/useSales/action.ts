import { salesStatData, salesUsers } from './data'
import {
  RQGetSalesStats,
  RQGetUser,
  RQListSalesStats,
  RQListUsers,
  salesStats,
  salesUserProps
} from './types'

const salesUserApi = {
  list: async (_rq: RQListUsers): Promise<salesUserProps[]> => {
    return Promise.resolve(salesUsers)
  },
  get: async (rq: RQGetUser): Promise<salesUserProps> => {
    const user = salesUsers.find(u => u.id === rq.id)
    if (!user) throw new Error('User not found')
    return Promise.resolve(user)
  }
}

const salesStatsApi = {
  list: async (_rq: RQListSalesStats): Promise<salesStats[]> => {
    return Promise.resolve(salesStatData)
  },
  get: async (rq: RQGetSalesStats): Promise<salesStats> => {
    const stat = salesStatData.find(u => u.id === rq.id)
    if (!stat) throw new Error('Stat not found')
    return Promise.resolve(stat)
  }
}
export { salesStatsApi, salesUserApi }
