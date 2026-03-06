import { salesData, salesStatData } from './data'
import { RQGetUsers, RQListUsers, RQStats, Sales, salesStats } from './types'

const Api = {
  // api
  stats: async (_rq: RQStats): Promise<salesStats[]> => {
    return Promise.resolve(salesStatData)
  },

  list: async (_rq: RQListUsers): Promise<Sales[]> => {
    return Promise.resolve(salesData)
  },

  get: async (rq: RQGetUsers): Promise<Sales> => {
    const people = salesData.find(u => u.id === rq.id)
    if (!people) throw new Error('User not found')
    return Promise.resolve(people)
  }
}
export { Api }
