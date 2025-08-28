// pages/settings-new/index.tsx
import { Button } from '@heroui/react'
import { PlusFilledIcon } from '@heroui/shared-icons'
import Settings from '../../pages/settings-new/settings-layout'
import { checkPermit, currentUser } from '../../pages/settings-new/utils'

const Index = () => {
  const canCreateTeam = checkPermit('team', 'create')
  const canUpdateTeam = checkPermit('team', 'update')
  const canCreateCompany = checkPermit('company', 'create')
  const canUpdateCompany = checkPermit('company', 'update')
  const canCreateAccount = checkPermit('account', 'create')
  const canUpdateAccount = checkPermit('account', 'update')
  const canUpdateNotification = checkPermit('notifications', 'update')
  const canUpdateIntegration = checkPermit('integrations', 'update')

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
              size="sm"
              variant="solid"
              color="primary"
              className="w-full sm:w-auto">
              Save
            </Button>
          )}
          {(canCreateTeam || canUpdateTeam) && (
            <Button size="sm" variant="solid" className="w-full sm:w-auto">
              <PlusFilledIcon /> Invite User
            </Button>
          )}
        </>
      }
      user={currentUser} // 👈 Pass down centralized user
    />
  )
}

export default Index
