'use client'

import { Button, Tab, Tabs } from '@vezham/react/v2'

import { PlusFilledIcon } from '@vx-oss/heroui-v2-shared-icons'

import AccountSetting from './account/index'
import CompanySetting from './company/index'
import IntegrationSetting from './integrations/index'
import NotificationSetting from './notifications/index'
import { ROLE_TAB_VISIBILITY } from './rebac'
import TeamSetting from './team/index'
import { User, usePermit } from './utils'

export default function SettingsLayout({
  user,
  endContent
}: {
  user: User
  endContent?: React.ReactNode
}) {
  const { value: canCreateTeam } = usePermit('team', 'create')
  const { value: canUpdateTeam } = usePermit('team', 'update')

  const tabItems = [
    { key: 'company', title: 'Company', component: <CompanySetting /> },
    { key: 'account', title: 'Account', component: <AccountSetting /> },
    {
      key: 'team',
      title: 'Team',
      component: (
        <TeamSetting
          endContent={(open: () => void) => {
            return (
              (canCreateTeam || canUpdateTeam) && (
                <Button
                  size="md"
                  variant="solid"
                  onPress={open}
                  startContent={<PlusFilledIcon />}>
                  Invite User
                </Button>
              )
            )
          }}
        />
      )
    },
    {
      key: 'notifications',
      title: 'Notifications',
      component: <NotificationSetting className="max-w-2xl" />
    },
    {
      key: 'integrations',
      title: 'Integrations',
      component: <IntegrationSetting />
    }
  ]

  const visibleTabs = tabItems.filter(item =>
    user.roles.some(role => ROLE_TAB_VISIBILITY[role].includes(item.key as any))
  )

  return (
    <div className="h-screen w-full">
      <div className="scrollbar-hide w-full flex-1 overflow-y-auto p-4">
        <div className="w-full max-w-2xl xl:mx-12 xl:max-w-5xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">Settings</h1>
              <h2 className="text-small text-default-500 mt-2">
                Customize settings, email preferences, and web appearance.
              </h2>
            </div>
            <div className="flex w-full gap-2 sm:w-auto">{endContent}</div>
          </div>

          <Tabs
            fullWidth
            classNames={{
              base: 'mt-6 w-full max-w-2xl',
              panel: 'w-full p-0 pt-4'
            }}>
            {visibleTabs.map(({ key, title, component }) => (
              <Tab key={key} title={title}>
                {component}
              </Tab>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
