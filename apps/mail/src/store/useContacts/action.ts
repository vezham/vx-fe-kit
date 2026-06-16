import { CONTACTS } from './data'
import type { ContactsResponse } from './types'

const Contacts = {
  list: async (): Promise<ContactsResponse> => {
    return Promise.resolve(CONTACTS)
  }
}

export { Contacts }
