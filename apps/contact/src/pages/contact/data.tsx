import React, { createContext, useContext, useEffect, useState } from 'react'

import { loadFromStorage, saveToStorage } from '../../utils/storage'
import { Group } from '../groups/types'
import { Contact } from './types'

type ContactContextType = {
  contacts: Contact[]
  favoriteIds: number[]
  groups: Group[]
  addContact: (contact: Contact) => void
  updateContact: (contact: Contact) => void
  deleteContact: (id: number) => void
  toggleFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
  addGroup: (name: string) => void
  deleteGroup: (groupId: number) => void
  addContactToGroup: (groupId: number, contactId: number) => void
}

const ContactContext = createContext<ContactContextType | null>(null)

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [contacts, setContacts] = useState<Contact[]>(() =>
    loadFromStorage('contacts', []).map((c: any) => ({
      ...c,
      id: Number(c.id)
    }))
  )

  const [favoriteIds, setFavoriteIds] = useState<number[]>(() =>
    loadFromStorage('favoriteIds', []).map((id: any) => Number(id))
  )

  const [groups, setGroups] = useState<Group[]>(() =>
    loadFromStorage('groups', []).map((g: any) => ({
      ...g,
      id: Number(g.id),
      contactIds: (g.contactIds || []).map((id: any) => Number(id))
    }))
  )

  useEffect(() => {
    saveToStorage('contacts', contacts)
    saveToStorage('favoriteIds', favoriteIds)
    saveToStorage('groups', groups)
  }, [contacts, favoriteIds, groups])

  const addContact = (contact: Contact) =>
    setContacts(prev => [
      ...prev,
      {
        ...contact,
        id: Number(contact.id)
      }
    ])

  const updateContact = (updated: Contact) =>
    setContacts(prev => prev.map(c => (c.id === updated.id ? updated : c)))

  const deleteContact = (id: number) => {
    setContacts(prev => prev.filter(c => c.id !== id))
    setFavoriteIds(prev => prev.filter(fid => fid !== id))

    setGroups(prev =>
      prev.map(group => ({
        ...group,
        contactIds: group.contactIds.filter(cid => cid !== id)
      }))
    )
  }

  const toggleFavorite = (id: number) => {
    setFavoriteIds(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    )
  }

  const isFavorite = (id: number) => favoriteIds.includes(id)

  const addGroup = (name: string) => {
    setGroups(prev => [
      ...prev,
      {
        id: Date.now(),
        name,
        contactIds: []
      }
    ])
  }

  const addContactToGroup = (groupId: number, contactId: number) => {
    setGroups(prev =>
      prev.map(group =>
        group.id === groupId
          ? {
              ...group,
              contactIds: group.contactIds.includes(contactId)
                ? group.contactIds
                : [...group.contactIds, contactId]
            }
          : group
      )
    )
  }

  const deleteGroup = (groupId: number) => {
    setGroups(prev => prev.filter(group => group.id !== groupId))
  }

  return (
    <ContactContext.Provider
      value={{
        contacts,
        favoriteIds,
        groups,
        addContact,
        updateContact,
        deleteContact,
        toggleFavorite,
        isFavorite,
        addGroup,
        addContactToGroup,
        deleteGroup
      }}>
      {children}
    </ContactContext.Provider>
  )
}

export const useContacts = () => {
  const context = useContext(ContactContext)
  if (!context)
    throw new Error('useContacts must be used inside ContactProvider')
  return context
}
