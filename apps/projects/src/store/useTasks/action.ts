// import { TaskData } from './data'
// import {
//   Task,
//   RQGetUsers,
//   RQListUsers,
// } from './types'
// const Api = {
//   list: async (_rq: RQListUsers): Promise<Task[]> => {
//     return Promise.resolve(TaskData)
//   },
//   get: async (rq: RQGetUsers): Promise<Task> => {
//     const people = TaskData.find(u => u.id === rq.id)
//     if (!people) throw new Error('User not found')
//     return Promise.resolve(people)
//   }
// }
// export { Api }
import { taskData } from './data'
import { RQGetUsers, RQListUsers, Task } from './types'

const Api = {
  list: async (_rq: RQListUsers): Promise<Task[]> => {
    return Promise.resolve([...taskData])
  },

  get: async (rq: RQGetUsers): Promise<Task> => {
    const Task = taskData.find(p => p.id === rq.id)
    if (!Task) throw new Error('Task not found')
    return Promise.resolve(Task)
  },

  create: async (payload: Task): Promise<Task> => {
    taskData.unshift(payload) // ✅ mutate array
    return Promise.resolve(payload)
  },

  delete: async (id: number): Promise<number> => {
    const index = taskData.findIndex(p => p.id === id)
    if (index !== -1) taskData.splice(index, 1)
    return Promise.resolve(id)
  }
}

export { Api }
