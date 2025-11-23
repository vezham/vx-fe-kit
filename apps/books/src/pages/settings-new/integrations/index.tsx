'use client'

import * as React from 'react'

import { Card, CardBody, Spacer, cn } from '@vezham/react/v2'

import { integrations } from './data'
import IntegrationCard from './integrationcard'
import { integrationVariants } from './variant'

interface IntegrationCardProps {
  className?: string
}

const IntegrationSetting = React.forwardRef<
  HTMLDivElement,
  IntegrationCardProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props}>
    <Card className={integrationVariants.wrapperCard} shadow="none">
      <CardBody>
        <div className={integrationVariants.sectionHeader}>
          <p className={integrationVariants.sectionTitle}>
            Connected Integrations
          </p>
          <p className={integrationVariants.sectionSubtitle}>
            Manage your third-party integrations and data sync
          </p>
        </div>

        <Spacer y={3} />

        <div className={integrationVariants.gridWrapper}>
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
