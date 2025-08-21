'use client'

import { Button, Card, CardBody, Divider, Switch } from '@heroui/react'
import * as React from 'react'

import { cn } from '@heroui/react'

interface NotificationSettingCardProps {
  className?: string
}

interface NotificationItem {
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

const generalNotifications: NotificationItem[] = [
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

const NotificationSetting = React.forwardRef<
  HTMLDivElement,
  NotificationSettingCardProps
>(({ className, ...props }, ref) => {
  const [emailNotifications, setEmailNotifications] = React.useState(true)
  const [pushNotifications, setPushNotifications] = React.useState(false)
  const [invoiceUpdates, setInvoiceUpdates] = React.useState(true)
  const [paymentNotifications, setPaymentNotifications] = React.useState(true)
  const [financialReports, setFinancialReports] = React.useState(false)

  const stateMap: Record<
    string,
    [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  > = {
    emailNotifications: [emailNotifications, setEmailNotifications],
    pushNotifications: [pushNotifications, setPushNotifications],
    invoiceUpdates: [invoiceUpdates, setInvoiceUpdates],
    paymentNotifications: [paymentNotifications, setPaymentNotifications],
    financialReports: [financialReports, setFinancialReports]
  }

  const renderSwitch = (item: NotificationItem) => {
    const [checked, setChecked] = stateMap[item.stateKey]
    return (
      <div key={item.id} className="flex items-center justify-between">
        <div className="">
          <label className="text-sm font-medium">{item.label}</label>
          <p className="text-default-400 text-sm font-normal">
            {item.description}
          </p>
        </div>
        <Switch
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
          color="default"
        />
      </div>
    )
  }

  return (
    <div ref={ref} className={cn('p-2', className)} {...props}>
      <Card className="border-default-200 border bg-transparent shadow-none">
        <CardBody className="space-y-6 px-4">
          <div>
            <p className="text-default-700 text-base font-medium">
              Notification Preferences
            </p>
            <p className="text-default-400 mt-1 text-sm font-normal">
              Choose how you want to be notified about important events
            </p>
          </div>
          <div className="space-y-4">
            {generalNotifications.map(renderSwitch)}
          </div>
          <Divider />
          <div className="space-y-4">
            <p className="text-default-700 text-base font-medium">
              Notification Types
            </p>
            {notificationTypes.map(renderSwitch)}
          </div>

          <div className="flex">
            <Button
              color="default"
              className="mt-4 w-auto text-white hover:bg-gray-800"
              variant="solid">
              Save Notification Settings
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
})

NotificationSetting.displayName = 'NotificationSetting'

export default NotificationSetting
