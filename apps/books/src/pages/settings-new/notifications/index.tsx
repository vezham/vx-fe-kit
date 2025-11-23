'use client'

import * as React from 'react'

import { Button, Card, CardBody, Divider, Switch, cn } from '@vezham/react/v2'

import { usePermit } from '../utils'
import { generalNotifications, notificationTypes } from './data'
import { NotificationItem, NotificationSettingCardProps } from './types'
import { notificationVariants } from './variant'

const NotificationSetting = React.forwardRef<
  HTMLDivElement,
  NotificationSettingCardProps
>(({ className, ...props }, ref) => {
  const { readOnly: canUpdate } = usePermit('notifications', 'update')

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
      <div key={item.id} className={notificationVariants.switchWrapper}>
        <div>
          <label className={notificationVariants.switchLabel}>
            {item.label}
          </label>
          <p className={notificationVariants.switchDescription}>
            {item.description}
          </p>
        </div>
        <Switch
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
          color="default"
          isDisabled={canUpdate}
        />
      </div>
    )
  }

  return (
    <div ref={ref} className={cn(className)} {...props}>
      <Card className={notificationVariants.card}>
        <CardBody className={notificationVariants.cardBody}>
          <div>
            <p className={notificationVariants.sectionTitle}>
              Notification Preferences
            </p>
            <p className={notificationVariants.sectionSubtitle}>
              Choose how you want to be notified about important events
            </p>
          </div>

          <div className={notificationVariants.sectionGroup}>
            {generalNotifications.map(renderSwitch)}
          </div>

          <Divider />

          <div className={notificationVariants.sectionGroup}>
            <p className={notificationVariants.sectionTitle}>
              Notification Types
            </p>
            {notificationTypes.map(renderSwitch)}
          </div>

          <div className={notificationVariants.buttonWrapper}>
            <Button
              color="default"
              className={notificationVariants.saveButton}
              variant="solid"
              isDisabled={canUpdate}>
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
