'use client'

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Switch
} from '@heroui/react'
import React, { useState } from 'react'
import { generalNotifications, notificationTypes } from './data'
import { NotificationItem, NotificationProps } from './types'
import { getCardClassName, getSwitchClass } from './variant'

const Notifications = React.forwardRef<HTMLDivElement, NotificationProps>(
  ({ isDarkMode }, ref) => {
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [pushNotifications, setPushNotifications] = useState(false)
    const [invoiceUpdates, setInvoiceUpdates] = useState(true)
    const [paymentNotifications, setPaymentNotifications] = useState(true)
    const [financialReports, setFinancialReports] = useState(false)

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
          <div className="space-y-0.5">
            <label className="text-sm font-medium">{item.label}</label>
            <p className="text-default-500 text-sm">{item.description}</p>
          </div>
          <Switch
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
            color="default"
            classNames={{
              wrapper: getSwitchClass(isDarkMode, checked),
              thumb: 'bg-white'
            }}
          />
        </div>
      )
    }

    return (
      <Card ref={ref} className={getCardClassName(isDarkMode)}>
        <CardHeader className="flex flex-col items-start">
          <h4 className="text-lg font-semibold">Notification Preferences</h4>
          <p className="text-default-500 text-sm">
            Choose how you want to be notified about important events
          </p>
        </CardHeader>

        <CardBody className="space-y-6">
          <div className="space-y-4">
            {generalNotifications.map(renderSwitch)}
          </div>
          <Divider />
          <div className="space-y-4">
            <h4 className="text-base font-semibold">Notification Types</h4>
            {notificationTypes.map(renderSwitch)}
          </div>

          <div className="flex">
            <Button
              color="default"
              className="w-auto bg-black text-white hover:bg-gray-800"
              variant="solid">
              Save Notification Settings
            </Button>
          </div>
        </CardBody>
      </Card>
    )
  }
)
export default Notifications
