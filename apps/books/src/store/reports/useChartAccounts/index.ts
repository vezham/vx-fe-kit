/* eslint-disable */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Api } from './action'
import { RQGetChartofAccounts, RQListChartofAccounts } from './types'

const CK_CHARTOFACCOUNTS = ['reports', 'chartofaccounts']

const useChartofAccounts = {
  list: (rq: RQListChartofAccounts) =>
    useQuery({
      queryKey: [...CK_CHARTOFACCOUNTS, 'list'],
      queryFn: () => Api.list(rq)
    }),

  get: (rq: RQGetChartofAccounts) =>
    useQuery({
      queryKey: [...CK_CHARTOFACCOUNTS, 'id', rq.id],
      queryFn: () => Api.get(rq)
    }),

  // New remove mutation hook
  remove: () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (id: string) => Api.remove(id),
      onSuccess: () => {
        // Invalidate and refetch the list after a successful deletion
        queryClient.invalidateQueries({
          queryKey: [...CK_CHARTOFACCOUNTS, 'list']
        })
      }
    })
  }
}

export function useChartofAccountsRefetch() {
  const queryClient = useQueryClient()
  return {
    all: () => queryClient.invalidateQueries({ queryKey: CK_CHARTOFACCOUNTS }),
    list: () =>
      queryClient.invalidateQueries({
        queryKey: [...CK_CHARTOFACCOUNTS, 'list']
      }),
    get: (id: string | number) =>
      queryClient.invalidateQueries({
        queryKey: [...CK_CHARTOFACCOUNTS, 'id', id]
      })
  }
}

export { useChartofAccounts }
