import { useQuery } from '@tanstack/react-query'

import { CurrentUser } from './action'
import { CURRENT_USER } from './data'

export * from './types'

export const CK_CURRENT_USER = 'current-user'

export const useCurrentUser = {
  get: () =>
    useQuery({
      queryKey: [CK_CURRENT_USER],
      queryFn: CurrentUser.get,
      initialData: CURRENT_USER
    })
}
