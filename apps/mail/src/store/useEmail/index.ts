import { useQuery } from '@tanstack/react-query'

import { Email } from './action'
import { THREADS } from './data'
import type { RQEmail } from './types'

export * from './types'

export const CK_EMAIL = 'email'

export const useEmail = {
  list: (rq: RQEmail = {}) =>
    useQuery({
      queryKey: [CK_EMAIL, rq],
      queryFn: () => Email.list(rq),
      initialData: {
        threads: THREADS
      }
    })
}
