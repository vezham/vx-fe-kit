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
import { RQGetUsers, RQListUsers, Task } from './types'

const CK_TASK = ['task']

export function useTaskList(rq: RQListUsers) {
  return useQuery({
    queryKey: [...CK_TASK, 'list', rq],
    queryFn: () => Api.list(rq)
  })
}

export function useTask(rq: RQGetUsers) {
  return useQuery({
    queryKey: [...CK_TASK, 'id', rq.id, rq],
    queryFn: () => Api.get(rq)
  })
}

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: Task) => Api.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...CK_TASK, 'list']
      })
    }
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => Api.delete(id),

    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: [...CK_TASK, 'list'] })

      const previousData = queryClient.getQueryData<Task[]>([
        ...CK_TASK,
        'list'
      ])

      queryClient.setQueryData<Task[]>([...CK_TASK, 'list'], (old = []) =>
        old.filter(p => p.id !== id)
      )

      return { previousData }
    },

    onError: (_err, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([...CK_TASK, 'list'], context.previousData)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [...CK_TASK, 'list'] })
    }
  })
}
