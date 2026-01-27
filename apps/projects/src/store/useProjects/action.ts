// import { projectData } from './data'
// import {
//   Project,
//   RQGetUsers,
//   RQListUsers,
// } from './types'
// const Api = {
//   list: async (_rq: RQListUsers): Promise<Project[]> => {
//     return Promise.resolve(projectData)
//   },
//   get: async (rq: RQGetUsers): Promise<Project> => {
//     const people = projectData.find(u => u.id === rq.id)
//     if (!people) throw new Error('User not found')
//     return Promise.resolve(people)
//   }
// }
// export { Api }
import { projectData } from './data'
import { Project, RQGetUsers, RQListUsers } from './types'

const Api = {
  list: async (_rq: RQListUsers): Promise<Project[]> => {
    return Promise.resolve([...projectData])
  },

  get: async (rq: RQGetUsers): Promise<Project> => {
    const project = projectData.find(p => p.projectsId === rq.id)
    if (!project) throw new Error('Project not found')
    return Promise.resolve(project)
  },

  create: async (payload: Project): Promise<Project> => {
    projectData.unshift(payload) // ✅ mutate array
    return Promise.resolve(payload)
  },

  delete: async (projectId: number): Promise<number> => {
    const index = projectData.findIndex(p => p.projectsId === projectId)
    if (index !== -1) projectData.splice(index, 1)
    return Promise.resolve(projectId)
  }
}

export { Api }
