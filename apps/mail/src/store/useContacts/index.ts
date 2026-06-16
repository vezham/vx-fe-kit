import { useQuery } from '@tanstack/react-query'

import { Contacts } from './action'
import { CONTACTS } from './data'

export * from './types'

export const CK_CONTACTS = 'contacts'

export const useContacts = {
  list: () =>
    useQuery({
      queryKey: [CK_CONTACTS],
      queryFn: Contacts.list,
      initialData: CONTACTS
    })
}
