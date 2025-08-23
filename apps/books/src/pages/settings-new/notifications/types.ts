export interface NotificationSettingCardProps {
  className?: string
}

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
