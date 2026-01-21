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
import { Project, RQGetUsers, RQListUsers } from './types'

const CK_PROJECT = ['project']

const useProjects = {
  list: (rq: RQListUsers) =>
    useQuery({
      queryKey: [...CK_PROJECT, 'list', rq],
      queryFn: () => Api.list(rq)
    }),

  get: (rq: RQGetUsers) =>
    useQuery({
      queryKey: [...CK_PROJECT, 'id', rq.id, rq],
      queryFn: () => Api.get(rq)
    }),

  create: () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (payload: Project) => Api.create(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [...CK_PROJECT, 'list'] })
      }
    })
  },

  delete: () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (id: number) => Api.delete(id),

      onSuccess: id => {
        queryClient.setQueryData<Project[]>(['project', 'list'], (old = []) =>
          old.filter(p => p.id !== id)
        )
      }
    })
  }
}

export { useProjects }
