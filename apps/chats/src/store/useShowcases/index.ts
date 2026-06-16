import { useQuery } from '@tanstack/react-query'

import { Showcase } from './action'
import { SHOWCASE_THREAD } from './data'
import type { RQShowcase } from './types'

export * from './types'

export const CK_SHOWCASE = 'showcase'

export const useShowcase = {
  get: (rq: RQShowcase = {}) =>
    useQuery({
      queryKey: [CK_SHOWCASE, rq],
      queryFn: () => Showcase.get(rq),
      initialData: SHOWCASE_THREAD
    })
}
