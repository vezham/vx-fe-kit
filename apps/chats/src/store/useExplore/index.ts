import { useQuery } from '@tanstack/react-query'

import { Explore } from './action'
import { EXPLORE_CATEGORIES } from './data'
import type { RQExplore } from './types'

export * from './types'

export const CK_EXPLORE = 'explore'

export const useExplore = {
  list: (rq: RQExplore = {}) =>
    useQuery({
      queryKey: [CK_EXPLORE, rq],
      queryFn: () => Explore.list(rq),
      initialData: EXPLORE_CATEGORIES
    })
}
