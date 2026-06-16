import { useQuery } from '@tanstack/react-query'

import { Library } from './action'
import { LIBRARY_ITEMS } from './data'
import type { RQLibrary } from './types'

export * from './types'

export const CK_LIBRARY = 'library'

export const useLibrary = {
  list: (rq: RQLibrary = {}) =>
    useQuery({
      queryKey: [CK_LIBRARY, rq],
      queryFn: () => Library.list(rq),
      initialData: LIBRARY_ITEMS
    })
}
