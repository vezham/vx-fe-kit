import { EmailAddress } from './types'

export const CONTACTS = {
  amelia: {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/emerald.jpg',
    email: 'amelia@linear.app',
    name: 'Amelia from Linear'
  },
  carlos: {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green-dark.jpg',
    email: 'carlos@heroui.dev',
    name: 'Carlos Iglesias'
  },
  emma: {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg',
    email: 'emma@conf-summit.com',
    name: 'Emma Park'
  },
  github: {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg',
    email: 'notifications@github.com',
    name: 'GitHub'
  },
  maya: {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/sky.jpg',
    email: 'maya@heroui.dev',
    name: 'Maya Okafor'
  },
  parker: {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/indigo.jpg',
    email: 'parker@heroui.dev',
    name: 'Parker Wren'
  },
  ravi: {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg',
    email: 'ravi@heroui.dev',
    name: 'Ravi Anand'
  },
  stripe: {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue-dark.jpg',
    email: 'receipts@stripe.com',
    name: 'Stripe'
  },
  travel: {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg',
    email: 'itinerary@flights.heroui.dev',
    name: 'Flights'
  }
} as const satisfies Record<string, EmailAddress>
