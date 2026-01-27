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
import { subtaskData } from './data'
import { RQGetUsers, RQListUsers, SubTask } from './types'

const Api = {
  list: async (_rq: RQListUsers): Promise<SubTask[]> => {
    return Promise.resolve([...subtaskData])
  },

  get: async (rq: RQGetUsers): Promise<SubTask> => {
    const Task = subtaskData.find(p => p.taskId === rq.id)
    if (!Task) throw new Error('Task not found')
    return Promise.resolve(Task)
  },

  create: async (payload: SubTask): Promise<SubTask> => {
    subtaskData.unshift(payload) // ✅ mutate array
    return Promise.resolve(payload)
  },

  delete: async (id: number): Promise<number> => {
    const index = subtaskData.findIndex(p => p.taskId === id)
    if (index !== -1) subtaskData.splice(index, 1)
    return Promise.resolve(id)
  }
}

export { Api }
