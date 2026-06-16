import { SHOWCASE_THREAD } from './data'
import type { RQShowcase, ShowcaseResponse } from './types'

const Showcase = {
  get: async (_rq: RQShowcase): Promise<ShowcaseResponse> => {
    return Promise.resolve(SHOWCASE_THREAD)
  }
}

export { Showcase }
