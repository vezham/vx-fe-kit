// pages/settings-new/index.tsx
import { Button } from '@heroui/react'
import { PlusFilledIcon } from '@heroui/shared-icons'
import Settings from '../../pages/settings-new/settings-layout'
import { hasPermission, User } from '../../pages/settings-new/utils'

const Index = () => {
  // 👇 Define the user object
  const user: User = {
    id: '1',
    roles: ['owner'],
    blockedBy: []
  }

  // ✅ Check if user can view notifications
  const canViewNotifications = hasPermission(user, 'notifications', 'view')
  console.log('Can view notifications:', canViewNotifications)

  // ✅ Check if user can create in "team"
  const canCreateTeam = hasPermission(user, 'team', 'create')
  console.log('Can create team:', canCreateTeam)

  return (
    <Settings
      endContent={
        <>
          <Button
            size="sm"
            variant="solid"
            color="primary"
            className="w-full sm:w-auto">
            Save
          </Button>
          {canCreateTeam && (
            <Button size="sm" variant="solid" className="w-full sm:w-auto">
              <PlusFilledIcon /> Invite User
            </Button>
          )}
        </>
      }
      user={user} // 👈 Pass the same user down
    />
  )
}

export default Index
