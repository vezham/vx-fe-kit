import { LIBRARY_ITEMS } from './data'
import type { LibraryResponse, RQLibrary } from './types'

const Library = {
  list: async (_rq: RQLibrary): Promise<LibraryResponse> => {
    return Promise.resolve(LIBRARY_ITEMS)
  }
}

export { Library }
