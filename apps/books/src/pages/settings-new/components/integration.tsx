'use client'

import { Avatar, Button, Card, CardBody, Chip, cn, Spacer } from '@heroui/react'
import * as React from 'react'

import {
  cardBodyClass,
  footerWrapperClass,
  gridWrapperClass,
  headerWrapperClass,
  statusWrapperClass
} from './variant'

interface IntegrationCardProps {
  className?: string
}

export type Integration = {
  name: string
  description: string
  subtitle?: string
  logo: string
  status: string
  lastSync: string
}

export const integrations: Integration[] = [
  {
    name: 'QuickBooks',
    description:
      'Sync data with QuickBooks Online for seamless accounting and financial management.',
    subtitle: 'By Intuit',
    logo: 'public/assets/SVG.png',
    status: 'connected',
    lastSync: '2024-01-29 09:15 AM'
  },
  {
    name: 'Stripe',
    description:
      'Process payments securely with the leading payment platform for online businesses.',
    subtitle: 'By Stripe Inc',
    logo: 'public/assets/SVG.png',
    status: 'connected',
    lastSync: 'Not connected'
  },
  {
    name: 'Xero',
    description:
      'Alternative accounting platform for small businesses and their advisors.',
    subtitle: 'By Xero Limited',
    logo: 'public/assets/SVG.png',
    status: 'available',
    lastSync: 'Not connected'
  },
  {
    name: 'PayPal',
    description: 'PayPal payment integration platform',
    subtitle: 'By The paypal Team',
    logo: 'public/assets/SVG.png',
    status: 'available',
    lastSync: '2024-01-29 10:30 AM'
  }
]

const IntegrationCard = ({
  name,
  description,
  subtitle,
  logo,
  status,
  lastSync
}: Integration) => {
  return (
    <Card className={'border-default-200 border bg-transparent shadow-none'}>
      <CardBody className={cardBodyClass}>
        <div className={headerWrapperClass}>
          <div>
            <p className="text-default-700 text-base font-medium">{name}</p>
            {subtitle && (
              <p className="text-default-400 mt-1 text-sm font-normal">
                {subtitle}
              </p>
            )}
          </div>

          <div>
            {' '}
            <Avatar
              src={logo}
              radius="full"
              className="bg-default-100 text-lg"></Avatar>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-default-400 mb-1 text-sm font-normal">
            {description}
          </p>
          <p className="text-default-400 my-4 text-sm font-normal">
            {lastSync}
          </p>
        </div>

        <div className={footerWrapperClass}>
          <Button variant="bordered" color="default" radius="sm" size="sm">
            Configure
          </Button>

          <div className={statusWrapperClass}>
            <Chip
              variant="dot"
              color={status === 'connected' ? 'primary' : 'success'}
              className="capitalize">
              {status}
            </Chip>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

const IntegrationSetting = React.forwardRef<
  HTMLDivElement,
  IntegrationCardProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-2', className)} {...props}>
    <Card className="border-default-200 border bg-transparent" shadow="none">
      <CardBody className="px-4">
        <div className="pb-3">
          <p className="text-default-700 text-base font-medium">
            Connected Integrations
          </p>
          <p className="text-default-400 mt-1 text-sm font-normal">
            Manage your third-party integrations and data sync
          </p>
        </div>
        <Spacer y={3} />
        <div className={gridWrapperClass}>
          {integrations.map((integration, index) => (
            <IntegrationCard key={index} {...integration} />
          ))}
        </div>
      </CardBody>
    </Card>
  </div>
))

IntegrationSetting.displayName = 'IntegrationSetting'

export default IntegrationSetting
