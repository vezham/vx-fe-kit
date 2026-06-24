import type { Contact } from './types'

export const CONTACTS: Record<string, Contact> = {
  amelia: {
    id: 'amelia',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/emerald.jpg',
    email: 'amelia@linear.app',
    name: 'Amelia from Linear'
  },
  carlos: {
    id: 'carlos',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green-dark.jpg',
    email: 'carlos@heroui.dev',
    name: 'Carlos Iglesias'
  },
  emma: {
    id: 'emma',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg',
    email: 'emma@conf-summit.com',
    name: 'Emma Park'
  },
  github: {
    id: 'github',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg',
    email: 'notifications@github.com',
    name: 'GitHub'
  },
  maya: {
    id: 'maya',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/sky.jpg',
    email: 'maya@heroui.dev',
    name: 'Maya Okafor'
  },
  parker: {
    id: 'parker',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/indigo.jpg',
    email: 'parker@heroui.dev',
    name: 'Parker Wren'
  },
  ravi: {
    id: 'ravi',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg',
    email: 'ravi@heroui.dev',
    name: 'Ravi Anand'
  },
  stripe: {
    id: 'stripe',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue-dark.jpg',
    email: 'receipts@stripe.com',
    name: 'Stripe'
  },
  travel: {
    id: 'travel',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg',
    email: 'itinerary@flights.heroui.dev',
    name: 'Flights'
  }
}

export function getContactsSnapshot() {
  return Object.values(CONTACTS).map(contact => ({ ...contact }))
}

export function findContactById(id: string) {
  return (
    CONTACTS[id as keyof typeof CONTACTS] ??
    Object.values(CONTACTS).find(contact => contact.email === id)
  )
}

export function upsertContactSnapshot(contact: Contact) {
  CONTACTS[contact.id] = contact

  return contact
}

export function deleteContactSnapshot(id: string) {
  const contact = findContactById(id)

  if (!contact) return undefined

  const key = Object.entries(CONTACTS).find(
    ([contactId, value]) => contactId === id || value.email === id
  )?.[0]

  if (!key) return undefined

  delete CONTACTS[key]

  return contact
}
