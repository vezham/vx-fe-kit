/* eslint-disable */
import { initialFolders } from './data'
import {
  FolderItem,
  RQGetChartofAccounts,
  RQListChartofAccounts
} from './types'

let data = [...initialFolders]

const Api = {
  // Return full chart of accounts list
  list: async (rq: RQListChartofAccounts): Promise<FolderItem[]> => {
    const type = 'All'

    if (type === 'All') {
      return Promise.resolve(data)
    }

    // filter by type
    const filterByType = (items: FolderItem[]): FolderItem[] =>
      items
        .map(item => {
          if (item.type === type) return item
          if (item.children) {
            const children = filterByType(item.children)
            if (children.length > 0) {
              return { ...item, children }
            }
          }
          return null
        })
        .filter(Boolean) as FolderItem[]

    return Promise.resolve(filterByType(data))
  },

  // Return a single account by id
  get: async (rq: RQGetChartofAccounts): Promise<FolderItem> => {
    const findItem = (items: FolderItem[]): FolderItem | undefined => {
      for (const item of items) {
        if (item.id === rq.id) return item
        if (item.children) {
          const found = findItem(item.children)
          if (found) return found
        }
      }
    }

    const item = findItem(data)
    if (!item) throw new Error(`Account not found for id ${rq.id}`)
    return Promise.resolve(item)
  },

  // New remove function
  remove: async (id: string): Promise<void> => {
    const removeItem = (items: FolderItem[]): FolderItem[] =>
      items.filter(item => {
        if (item.id === id) {
          return false // Exclude the item to be deleted
        }
        if (item.children) {
          item.children = removeItem(item.children)
        }
        return true
      })

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    data = removeItem(data)

    return Promise.resolve()
  }
}

export { Api }
