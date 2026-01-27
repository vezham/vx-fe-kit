// /* eslint-disable */
// import { useQuery } from '@tanstack/react-query'
// import { Api } from './action'
// import { RQGetUsers, RQListUsers} from './types'
// const CK_PROJECT = [ 'project']
// const useProjects = {
//   list: (rq: RQListUsers) =>
//     useQuery({
//       queryKey: [...CK_PROJECT, 'list'],
//       queryFn: () => Api.list(rq)
//     }),
//   get: (rq: RQGetUsers) =>
//     useQuery({
//       queryKey: [...CK_PROJECT, 'id', rq.id],
//       queryFn: () => Api.get(rq)
//     })
// }
// export { useProjects }
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Api } from './action'
import { RQGetUsers, RQListUsers, SubTask } from './types'

const CK_SUBTASK = ['subtask']

export function useSubTaskList(rq: RQListUsers) {
  return useQuery({
    queryKey: [...CK_SUBTASK, 'list', rq],
    queryFn: () => Api.list(rq)
  })
}

export function useSubTask(rq: RQGetUsers) {
  return useQuery({
    queryKey: [...CK_SUBTASK, 'id', rq.id, rq],
    queryFn: () => Api.get(rq)
  })
}

export function useCreateSubTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: SubTask) => Api.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...CK_SUBTASK, 'list']
      })
    }
  })
}

export function useDeleteSubTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => Api.delete(id),

    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: [...CK_SUBTASK, 'list'] })

      const previousData = queryClient.getQueryData<SubTask[]>([
        ...CK_SUBTASK,
        'list'
      ])

      queryClient.setQueryData<SubTask[]>([...CK_SUBTASK, 'list'], (old = []) =>
        old.filter(p => p.subtaskId !== id)
      )

      return { previousData }
    },

    onError: (_err, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([...CK_SUBTASK, 'list'], context.previousData)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [...CK_SUBTASK, 'list'] })
    }
  })
}
