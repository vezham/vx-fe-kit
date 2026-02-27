import { Icon } from '@iconify/react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useState } from 'react'

import { Button } from '@vezham/react/v3'

import { useContacts } from './data'
import { ContactDrawer } from './drawer'

const ContactDetail = () => {
  const { contactId } = useParams({ strict: false })
  const navigate = useNavigate()
  const { contacts, deleteContact } = useContacts()

  const [isEditOpen, setIsEditOpen] = useState(false)

  const contact = contacts.find(c => String(c.id) === contactId)

  if (!contact) return <div className="p-8">Contact not found</div>

  const fullName = `${contact.firstName} ${contact.lastName ?? ''}`

  const handleDelete = () => {
    deleteContact(contact.id)
    navigate({ to: '/' })
  }

  const formatBirthday = (birthday: any) => {
    if (!birthday) return ''
    if (typeof birthday === 'string') return birthday
    if (birthday.year && birthday.month && birthday.day) {
      const date = new Date(birthday.year, birthday.month - 1, birthday.day)
      return date.toLocaleDateString()
    }
    return ''
  }

  return (
    <>
      <div className="relative p-6">
        <div className="absolute top-[-16px] left-5">
          <Button
            isIconOnly
            size="sm"
            variant="outline"
            className="rounded-md shadow-md"
            onClick={() => navigate({ to: '/', replace: true })}>
            <Icon icon="mdi:chevron-left" />
          </Button>
        </div>
        <div className="top-8 my-8 flex flex-col items-center gap-4">
          <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gray-300 text-4xl font-bold">
            {contact.avatar ? (
              <img
                src={contact.avatar}
                className="h-full w-full object-cover"
                alt={fullName}
              />
            ) : (
              contact.firstName.charAt(0).toUpperCase()
            )}
          </div>

          <h1 className="text-2xl font-semibold">{fullName}</h1>

          <div className="mt-4 flex gap-3">
            <Button
              variant="primary"
              className="rounded-md"
              onPress={() => setIsEditOpen(true)}>
              Edit
            </Button>
            <Button
              className="rounded-md"
              variant="danger"
              onPress={handleDelete}>
              Delete
            </Button>
          </div>
        </div>

        <div className="mx-auto max-w-md space-y-4">
          {contact.company && (
            <Detail label="Company" value={contact.company} />
          )}
          {contact.jobTitle && (
            <Detail label="Job Title" value={contact.jobTitle} />
          )}
          {contact.phones?.map((p, i) => (
            <Detail key={i} label="Phone" value={p} />
          ))}
          {contact.emails?.map((e, i) => (
            <Detail key={i} label="Email" value={e} />
          ))}
          {contact.addresses?.map((a, i) => (
            <Detail key={i} label="Address" value={a} />
          ))}
          {contact.birthday && (
            <Detail label="Birthday" value={formatBirthday(contact.birthday)} />
          )}
        </div>

        <ContactDrawer
          isOpen={isEditOpen}
          onOpenChange={setIsEditOpen}
          editContact={contact}
        />
      </div>
    </>
  )
}

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p>{value}</p>
  </div>
)

export default ContactDetail
