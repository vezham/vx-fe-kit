import { Icon } from '@iconify/react'
import { useNavigate } from '@tanstack/react-router'

import { useContacts } from '../contact/data'

const FavoritesList = () => {
  const { contacts, favoriteIds, toggleFavorite } = useContacts()
  const navigate = useNavigate()

  const favoriteContacts = contacts.filter(contact =>
    favoriteIds.includes(contact.id)
  )

  if (favoriteContacts.length === 0) {
    return (
      <div className="text-default-400 flex h-full items-center justify-center">
        No favorite contacts
      </div>
    )
  }

  return (
    <div className="mt-4 flex flex-col gap-4">
      {favoriteContacts.map(contact => (
        <div
          key={contact.id}
          className="border-default-200 hover:bg-default-100 flex items-center justify-between rounded-md border p-3 transition">
          <div
            className="flex-1 cursor-pointer"
            onClick={() =>
              navigate({
                to: '/user/$contactId',
                params: { contactId: String(contact.id) }
              })
            }>
            <h3 className="font-semibold">
              {contact.firstName} {contact.lastName ?? ''}
            </h3>
          </div>

          <Icon
            icon="mdi:star-off"
            className="h-6 w-6 cursor-pointer text-gray-500"
            onClick={() => toggleFavorite(contact.id)}
          />
        </div>
      ))}
    </div>
  )
}

export default FavoritesList
