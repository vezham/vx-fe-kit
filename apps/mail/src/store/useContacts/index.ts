import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { r } from 'shiki/dist/langs-bundle-full-WSWgUeqW.mjs'

import { Contacts } from './action'
import { findContactById, getContactsSnapshot } from './data'
import type {
  Contact,
  RQContactsCreate,
  RQContactsDelete,
  RQContactsGet
} from './types'

export * from './types'

export const CK_CONTACTS = 'contacts'

function syncContactCaches(
  queryClient: ReturnType<typeof useQueryClient>,
  contact: Contact | undefined,
  mode: 'create' | 'delete'
) {
  const queries = queryClient
    .getQueryCache()
    .findAll({ queryKey: [CK_CONTACTS] })

  for (const query of queries) {
    const queryKey = query.queryKey as readonly unknown[]
    const scope = queryKey[1]

    if (scope === 'get' || scope === 'getById') {
      const currentId = String(queryKey[2] ?? '')

      if (mode === 'delete') {
        if (!contact || currentId !== contact.id) continue
        queryClient.setQueryData(queryKey, undefined)
        continue
      }

      if (!contact || currentId !== contact.id) continue
      queryClient.setQueryData(queryKey, { ...contact })
      continue
    }

    if (scope !== undefined && scope !== 'list') continue

    queryClient.setQueryData<Contact[]>(queryKey, current => {
      const list = current ?? []

      if (mode === 'delete') {
        if (!contact) return list
        return list.filter(item => item.id !== contact.id)
      }

      if (!contact) return list

      const next = list.filter(item => item.id !== contact.id)
      return [{ ...contact }, ...next]
    })
  }
}

export const useContacts = {
  create: () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (rq: RQContactsCreate) => Contacts.create(rq),
      onSuccess: contact => {
        syncContactCaches(queryClient, contact, 'create')
        queryClient.invalidateQueries({ queryKey: [CK_CONTACTS] })
      }
    })
  },

  delete: () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (rq: RQContactsDelete) => Contacts.delete(rq),
      onSuccess: contact => {
        syncContactCaches(queryClient, contact, 'delete')
        queryClient.invalidateQueries({ queryKey: [CK_CONTACTS] })
      }
    })
  },

  get: (rq: RQContactsGet) =>
    useQuery({
      enabled: Boolean(rq.id),
      initialData: () => {
        const contact = findContactById(rq.id)
        return contact ? { ...contact } : undefined
      },
      queryFn: () => Contacts.get(rq),
      queryKey: [CK_CONTACTS, 'get', rq.id, rq]
    }),

  getById: (rq: RQContactsGet) =>
    useQuery({
      enabled: Boolean(rq.id),
      initialData: () => {
        const contact = findContactById(rq.id)
        return contact ? { ...contact } : undefined
      },
      queryFn: () => Contacts.getById(rq),
      queryKey: [CK_CONTACTS, 'getById', rq.id, rq]
    }),

  list: () =>
    useQuery({
      initialData: () => getContactsSnapshot(),
      queryFn: Contacts.list,
      queryKey: [CK_CONTACTS, 'list']
    })
}
