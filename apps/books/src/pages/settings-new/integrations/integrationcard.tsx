'use client'

import { Avatar, Button, Card, CardBody, CardFooter, Chip } from '@heroui/react'
import { usePermit } from '../utils'
import { Integration } from './types'
import { integrationVariants } from './variant'

const IntegrationCard = ({
  name,
  description,
  subtitle,
  logo,
  status,
  lastSync
}: Integration) => {
  const { readOnly: canUpdate } = usePermit('integrations', 'update')

  return (
    <Card className={integrationVariants.card}>
      <CardBody className={integrationVariants.cardBody}>
        <div className={integrationVariants.headerWrapper}>
          <div className={integrationVariants.headerText}>
            <p className={integrationVariants.cardTitle}>{name}</p>
            <p className={integrationVariants.cardSubtitle}>{subtitle}</p>
          </div>
          <Avatar src={logo} />
        </div>

        <div className={integrationVariants.descriptionWrapper}>
          <p className={integrationVariants.cardDescription}>{description}</p>
          <p className={integrationVariants.lastSync}>{lastSync}</p>
        </div>
      </CardBody>

      <CardFooter className={integrationVariants.footerWrapper}>
        <Button size="sm" variant="faded" isDisabled={canUpdate}>
          Configure
        </Button>
        <Chip
          isDisabled={canUpdate}
          variant="dot"
          color={status === 'connected' ? 'primary' : 'success'}
          className={integrationVariants.statusChip}>
          {status}
        </Chip>
      </CardFooter>
    </Card>
  )
}

export default IntegrationCard
