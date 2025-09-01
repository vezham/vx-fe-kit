// pages/settings-new/index.tsx
import { Button } from '@heroui/react'
import { PlusFilledIcon } from '@heroui/shared-icons'
import Settings from '../../pages/settings-new/settings-layout'
import { currentUser, usePermit } from '../../pages/settings-new/utils'

const Index = () => {
  const { value: canCreateTeam } = usePermit('team', 'create')
  const { value: canUpdateTeam } = usePermit('team', 'update')
  const { value: canCreateCompany } = usePermit('company', 'create')
  const { value: canUpdateCompany } = usePermit('company', 'update')
  const { value: canCreateAccount } = usePermit('account', 'create')
  const { value: canUpdateAccount } = usePermit('account', 'update')
  const { value: canUpdateNotification } = usePermit('notifications', 'update')
  const { value: canUpdateIntegration } = usePermit('integrations', 'update')

  return (
    <Settings
      endContent={
        <>
          {(canUpdateCompany ||
            canCreateCompany ||
            canCreateAccount ||
            canUpdateAccount ||
            canCreateTeam ||
            canUpdateTeam ||
            canUpdateNotification ||
            canUpdateIntegration) && (
            <Button
              size="md"
              variant="solid"
              color="primary"
              className="w-full sm:w-auto">
              Save
            </Button>
          )}
          {(canCreateTeam || canUpdateTeam) && (
            <Button
              size="md"
              variant="solid"
              className="w-full sm:w-auto"
              startContent={<PlusFilledIcon />}>
              Invite User
            </Button>
          )}
        </>
      }
      user={currentUser} // 👈 Pass down centralized user
    />
  )
}

export default Index
