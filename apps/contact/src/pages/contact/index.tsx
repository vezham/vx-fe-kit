// import { useNavigate } from '@tanstack/react-router'
// import { useContacts } from '../../store/useContacts/data'
// const ContactList = () => {
//   const { contacts } = useContacts()
//   const navigate = useNavigate()
//   return (
//       <div className="flex flex-col gap-4 mt-4">
//       {contacts.map((contact) => (
//         <div
//           key={contact.id}
//           onClick={() =>
//             navigate({
//               to: '/user/$contactId',
//               params: { contactId: String(contact.id) },
//             })
//           }
//           className="border border-default-200 p-3 rounded-md cursor-pointer hover:bg-default-100 transition"
//         >
//           <h3 className="font-semibold">
//             {contact.firstName} {contact.lastName ?? ''}
//           </h3>
//         </div>
//       ))}
//     </div>
//   )
// }
// export default ContactList
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useState } from 'react'

import { useContacts } from './data'

const ContactList = () => {
  const {
    contacts,
    favoriteIds,
    groups,
    toggleFavorite,
    deleteContact,
    addContactToGroup
  } = useContacts()

  const { groupId } = useParams({ strict: false })
  const navigate = useNavigate()
  const [openFor, setOpenFor] = useState<number | null>(null)

  const isFavorite = (id: number) => favoriteIds.includes(id)

  let filteredContacts = contacts

  if (groupId) {
    const group = groups.find(g => g.id === Number(groupId))
    if (group) {
      filteredContacts = contacts.filter(contact =>
        group.contactIds.includes(contact.id)
      )
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-4">
      {filteredContacts.length === 0 ? (
        <p className="text-muted flex items-center justify-center px-3">
          No contacts found
        </p>
      ) : (
        filteredContacts.map(contact => (
          <div
            key={contact.id}
            className="border-default-300 hover:bg-content2 relative flex items-center justify-between rounded-md border p-3 transition">
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

            <div className="relative flex items-center gap-3">
              <Icon
                icon="mdi:star"
                className={`h-6 w-6 cursor-pointer ${
                  isFavorite(contact.id) ? 'text-yellow-400' : 'text-muted'
                }`}
                onClick={() => toggleFavorite(contact.id)}
              />

              <Icon
                icon="mdi:account-multiple-plus"
                className="h-6 w-6 cursor-pointer text-blue-500"
                onClick={() =>
                  setOpenFor(openFor === contact.id ? null : contact.id)
                }
              />

              <Icon
                icon="mdi:delete"
                className="h-6 w-6 cursor-pointer text-red-500"
                onClick={() => deleteContact(contact.id)}
              />

              {openFor === contact.id && groups.length > 0 && (
                <div className="absolute top-10 right-0 z-50 w-48 rounded-md border bg-white shadow-md">
                  {groups.map(group => (
                    <div
                      key={group.id}
                      className="hover:bg-default-100 cursor-pointer px-3 py-2 text-sm"
                      onClick={() => {
                        addContactToGroup(group.id, contact.id)
                        setOpenFor(null)
                      }}>
                      {group.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default ContactList
