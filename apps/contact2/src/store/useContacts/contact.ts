import { useCallback, useMemo, useState } from 'react'

export interface Contact {
  id: number
  name: string
  notes: string
  group?: 'iCloud' | 'onMyMac' | 'other'
  firstName?: string
  lastName?: string
  company?: string
  mobile?: string
  home?: string
  email?: string
  pronouns?: string
  ringtone?: string
  textTone?: string
  url?: string
  birthday?: string
  username?: string
  street?: string
  city?: string
  state?: string
  zip?: string
  country?: string
}

export const useContactsStore = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'Krishna',
      notes: '',
      group: 'iCloud',
      firstName: 'Krishna'
    },
    { id: 2, name: 'Vikram', notes: '', group: 'iCloud', firstName: 'Vikram' },
    {
      id: 3,
      name: 'John Appleseed',
      notes: '',
      group: 'onMyMac',
      firstName: 'John',
      lastName: 'Appleseed'
    },
    {
      id: 4,
      name: 'Jane Doe',
      notes: '',
      group: 'other',
      firstName: 'Jane',
      lastName: 'Doe'
    }
  ])
  const [selectedId, setSelectedId] = useState<number | null>(1)
  const [activeGroup, setActiveGroup] = useState<
    'all' | 'iCloud' | 'onMyMac' | 'other'
  >('all')

  const selected = useMemo(
    () => contacts.find(c => c.id === selectedId),
    [contacts, selectedId]
  )

  const filteredByGroup = useMemo(() => {
    if (activeGroup === 'all') return contacts
    return contacts.filter(c => c.group === activeGroup)
  }, [contacts, activeGroup])

  const add = useCallback((contact: Omit<Contact, 'id'>) => {
    const newContact = { ...contact, id: Date.now() }
    setContacts(prev => [newContact, ...prev])
    setSelectedId(newContact.id)
    return newContact
  }, [])

  const update = useCallback((id: number, data: Partial<Contact>) => {
    setContacts(prev => prev.map(c => (c.id === id ? { ...c, ...data } : c)))
  }, [])

  const remove = useCallback(
    (id: number) => {
      setContacts(prev => {
        const filtered = prev.filter(c => c.id !== id)
        if (selectedId === id) {
          setSelectedId(filtered.length > 0 ? filtered[0]?.id || null : null)
        }
        return filtered
      })
    },
    [selectedId]
  )

  return {
    contacts,
    filteredByGroup,
    selected,
    selectedId,
    activeGroup,
    setActiveGroup,
    setSelectedId,
    add,
    update,
    remove
  }
}
