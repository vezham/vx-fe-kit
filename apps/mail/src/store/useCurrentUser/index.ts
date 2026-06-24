import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { CurrentUser } from './action'
import { getCurrentUserSnapshot } from './data'
import type { RQCurrentUserUpdate } from './types'

export * from './types'

export const CK_CURRENT_USER = 'current-user'

export const useCurrentUser = {
  get: () =>
    useQuery({
      queryKey: [CK_CURRENT_USER],
      queryFn: CurrentUser.get,
      initialData: () => getCurrentUserSnapshot()
    }),

  update: () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (rq: RQCurrentUserUpdate) => CurrentUser.update(rq),
      onSuccess: currentUser => {
        queryClient.setQueryData([CK_CURRENT_USER], { ...currentUser })
        queryClient.invalidateQueries({ queryKey: [CK_CURRENT_USER] })
      }
    })
  }
}
