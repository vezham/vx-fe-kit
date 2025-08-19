import { NotificationItem } from './types'

export const generalNotifications: NotificationItem[] = [
  {
    id: 'email',
    label: 'Email Notifications',
    description: 'Receive notifications via email',
    stateKey: 'emailNotifications'
  },
  {
    id: 'push',
    label: 'Push Notifications',
    description: 'Receive push notifications in your browser',
    stateKey: 'pushNotifications'
  }
]

export const notificationTypes: NotificationItem[] = [
  {
    id: 'invoice',
    label: 'Invoice Updates',
    description: 'New invoices, payments, and overdue notices',
    stateKey: 'invoiceUpdates'
  },
  {
    id: 'payment',
    label: 'Payment Notifications',
    description: 'Payment confirmations and failed payments',
    stateKey: 'paymentNotifications'
  },
  {
    id: 'financial',
    label: 'Financial Reports',
    description: 'Monthly reports and financial summaries',
    stateKey: 'financialReports'
  }
]
