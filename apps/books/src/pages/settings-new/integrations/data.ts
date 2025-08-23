// data.ts
import { Integration } from './types'

export const integrations: Integration[] = [
  {
    name: 'QuickBooks',
    description:
      'Sync data with QuickBooks Online for seamless accounting and financial management.',
    subtitle: 'By Intuit',
    logo: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatars/e1b8ec120710c09589a12c0004f85825.jpg',
    status: 'connected',
    lastSync: '2024-01-29 09:15 AM'
  },
  {
    name: 'Stripe',
    description:
      'Process payments securely with the leading payment platform for online businesses.',
    subtitle: 'By Stripe Inc',
    logo: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatars/e1b8ec120710c09589a12c0004f85825.jpg',
    status: 'connected',
    lastSync: 'Not connected'
  },
  {
    name: 'Xero',
    description:
      'Alternative accounting platform for small businesses and their advisors.',
    subtitle: 'By Xero Limited',
    logo: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatars/e1b8ec120710c09589a12c0004f85825.jpg',
    status: 'available',
    lastSync: 'Not connected'
  },
  {
    name: 'PayPal',
    description: 'PayPal payment integration platform for done payments.',
    subtitle: 'By The PayPal Team',
    logo: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatars/e1b8ec120710c09589a12c0004f85825.jpg',
    status: 'available',
    lastSync: '2024-01-29 10:30 AM'
  }
]
