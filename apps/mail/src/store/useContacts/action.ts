import {
  deleteContactSnapshot,
  findContactById,
  getContactsSnapshot,
  upsertContactSnapshot
} from './data'
import type {
  Contact,
  ContactsResponse,
  RQContactsCreate,
  RQContactsDelete,
  RQContactsGet
} from './types'

function createId(prefix: string) {
  return `${prefix}-${globalThis.crypto?.randomUUID?.() ?? Date.now()}`
}

const Contacts = {
  list: async (): Promise<ContactsResponse> => {
    return Promise.resolve(getContactsSnapshot())
  },

  get: async (rq: RQContactsGet): Promise<Contact | undefined> => {
    return Promise.resolve(findContactById(rq.id))
  },

  getById: async (rq: RQContactsGet): Promise<Contact | undefined> => {
    return Promise.resolve(findContactById(rq.id))
  },

  create: async (rq: RQContactsCreate): Promise<Contact> => {
    const contact: Contact = {
      avatar: rq.avatar,
      email: rq.email,
      id: rq.id ?? createId('contact'),
      name: rq.name
    }

    upsertContactSnapshot(contact)

    return Promise.resolve(contact)
  },

  delete: async (rq: RQContactsDelete): Promise<Contact | undefined> => {
    return Promise.resolve(deleteContactSnapshot(rq.id))
  }
}

export { Contacts }
