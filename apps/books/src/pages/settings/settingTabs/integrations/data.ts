import { Integration } from './types'

export const integrations: Integration[] = [
  {
    name: 'QuickBooks',
    description: 'Sync data with QuickBooks Online',
    emoji: '📊',
    isConnected: true,
    lastSync: '2024-01-29 10:30 AM'
  },
  {
    name: 'Stripe',
    description: 'Payment processing integration',
    emoji: '💳',
    isConnected: true,
    lastSync: '2024-01-29 09:15 AM'
  },
  {
    name: 'Xero',
    description: 'Alternative accounting platform',
    emoji: '📈',
    isConnected: false,
    lastSync: 'Not connected'
  },
  {
    name: 'PayPal',
    description: 'PayPal payment integration platform',
    emoji: '🅿️',
    isConnected: false,
    lastSync: 'Not connected'
  }
]
