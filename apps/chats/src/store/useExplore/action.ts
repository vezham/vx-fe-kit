import { EXPLORE_CATEGORIES } from './data'
import type { ExploreResponse, RQExplore } from './types'

const Explore = {
  list: async (_rq: RQExplore): Promise<ExploreResponse> => {
    return Promise.resolve(EXPLORE_CATEGORIES)
  }
}

export { Explore }
