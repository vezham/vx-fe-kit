import { Integration } from './types'

export const integrations: Integration[] = [
  {
    name: 'QuickBooks',
    description:
      'Sync data with QuickBooks Online for seamless accounting and financial management.',
    subtitle: 'By Intuit',
    logo: '📊',
    isConnected: true,
    lastSync: '2024-01-29 09:15 AM'
  },
  {
    name: 'Stripe',
    description:
      'Process payments securely with the leading payment platform for online businesses.',
    subtitle: 'By Stripe Inc',
    logo: '💳',
    isConnected: false,
    lastSync: 'Not connected'
  },
  {
    name: 'Xero',
    description:
      'Alternative accounting platform for small businesses and their advisors.',
    subtitle: 'By Xero Limited',
    logo: '📈',
    isConnected: false,
    lastSync: 'Not connected'
  },
  {
    name: 'PayPal',
    description: 'PayPal payment integration platform',
    subtitle: 'By The paypal Team',
    logo: '🅿️',
    isConnected: true,
    lastSync: '2024-01-29 10:30 AM'
  }
]
