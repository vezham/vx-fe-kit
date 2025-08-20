'use client'

import { Button, Card, CardBody, CardHeader } from '@heroui/react'
import { integrations } from './data'
import { Integration, IntegrationProps } from './types'
import {
  cardBodyClass,
  descriptionClass,
  footerWrapperClass,
  getButtonClass,
  getCardClassName,
  getPanelClassName,
  getStatusColor,
  getStatusText,
  gridWrapperClass,
  headerLeftClass,
  headerLogoClass,
  headerWrapperClass,
  lastSyncClass,
  panelBodyClass,
  panelHeaderClass,
  panelSubtitleClass,
  panelTitleClass,
  statusDotClass,
  statusWrapperClass,
  subtitleClass,
  titleClass
} from './variant'

type IntegrationCardProps = Integration & { isDarkMode?: boolean }

const IntegrationCard = ({
  name,
  description,
  subtitle,
  logo,
  isConnected,
  lastSync,
  isDarkMode
}: IntegrationCardProps) => {
  return (
    <Card className={getCardClassName(isDarkMode)}>
      <CardBody className={cardBodyClass}>
        <div className={headerWrapperClass}>
          <div className={headerLeftClass}>
            <h4 className={titleClass}>{name}</h4>
            {subtitle && <p className={subtitleClass}>{subtitle}</p>}
          </div>

          <div className={headerLogoClass}>{logo}</div>
        </div>

        <div className="flex flex-col">
          <p className={descriptionClass}>{description}</p>
          <p className={lastSyncClass}>{lastSync}</p>
        </div>

        <div className={footerWrapperClass}>
          <Button
            variant={isConnected ? 'bordered' : 'solid'}
            color="default"
            className={getButtonClass(isConnected, isDarkMode)}
            radius="sm"
            size="sm">
            {isConnected ? 'Configure' : 'Connect'}
          </Button>

          <div className={statusWrapperClass}>
            <div
              className={`${statusDotClass} ${getStatusColor(isConnected)}`}
            />
            <span className="text-default-500 text-sm">
              {getStatusText(isConnected)}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

const IntegrationsPanel = ({ isDarkMode }: IntegrationProps) => {
  return (
    <Card className={getPanelClassName(isDarkMode)}>
      <CardHeader className={panelHeaderClass}>
        <h4 className={panelTitleClass}>Connected Integrations</h4>
        <p className={panelSubtitleClass}>
          Manage your third-party integrations and data sync
        </p>
      </CardHeader>
      <CardBody className={panelBodyClass}>
        <div className={gridWrapperClass}>
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
