export interface NotificationItem {
  id: string
  label: string
  description: string
  stateKey:
    | 'emailNotifications'
    | 'pushNotifications'
    | 'invoiceUpdates'
    | 'paymentNotifications'
    | 'financialReports'
}

export interface NotificationProps {
  isDarkMode?: boolean
  className?: string
}
