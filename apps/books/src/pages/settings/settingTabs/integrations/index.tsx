'use client'

import { Button, Card, CardBody, CardHeader, Chip } from '@heroui/react'
import { integrations } from './data'
import { Integration, IntegrationProps } from './types'
import {
  getButtonClass,
  getCardClassName,
  getChipColor,
  getPanelClassName
} from './variant'

type IntegrationCardProps = Integration & { isDarkMode?: boolean }

const IntegrationCard = ({
  name,
  description,
  emoji,
  isConnected,
  lastSync,
  isDarkMode
}: IntegrationCardProps) => {
  return (
    <Card className={getCardClassName(isDarkMode)}>
      <CardBody className="p-6">
        <div className="flex">
          <div>
            <h4 className="text-lg font-medium">{name}</h4>
            <p className="text-default-500 mt-1">{description}</p>

            <p className="text-default-500 mt-4 text-xs">
              Last sync: {lastSync}
            </p>

            <div className="mt-6 flex w-full items-center justify-between">
              <Button
                variant={isConnected ? 'bordered' : 'solid'}
                color="default"
                className={getButtonClass(isConnected, isDarkMode)}
                radius="sm"
                size="sm">
                {isConnected ? 'Configure' : 'Connect'}
              </Button>

              <Chip
                color={getChipColor(isConnected, isDarkMode)}
                variant="solid"
                size="sm">
                {isConnected ? 'Connected' : 'Available'}
              </Chip>
            </div>
          </div>

          <div className="text-3xl">{emoji}</div>
        </div>
      </CardBody>
    </Card>
  )
}

const IntegrationsPanel = ({ isDarkMode }: IntegrationProps) => {
  return (
    <Card className={getPanelClassName(isDarkMode)}>
      <CardHeader className="mt-1 flex flex-col items-start gap-2">
        <h4 className="text-lg leading-none font-medium">
          Connected Integrations
        </h4>
        <p className="text-default-500 text-sm">
          Manage your third-party integrations and data sync
        </p>
      </CardHeader>
      <CardBody className="pb-6">
        <div className="grid gap-6 md:grid-cols-2">
          {integrations.map((integration, index) => (
            <IntegrationCard
              key={index}
              {...integration}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

export default IntegrationsPanel
