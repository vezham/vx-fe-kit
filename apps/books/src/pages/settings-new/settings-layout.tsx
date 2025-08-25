import { Button, Tab, Tabs } from '@heroui/react'

import { PlusFilledIcon } from '@heroui/shared-icons'

import AccountSetting from './account/index'
import CompanySetting from './company/index'
import IntegrationSetting from './integrations/index'
import NotificationSetting from './notifications/index'
import TeamSetting from './team/index'

export default function Component({
  endContent
}: {
  endContent?: React.ReactNode
}) {
  const tabItems = [
    {
      key: 'company',
      title: 'Company',
      component: <CompanySetting />
    },
    {
      key: 'account',
      title: 'Account',
      component: <AccountSetting />
    },
    {
      key: 'team',
      title: 'Team',
      component: (
        <TeamSetting
          endContent={open => (
            <Button size="sm" variant="solid" onPress={open}>
              <PlusFilledIcon></PlusFilledIcon> Invite User
            </Button>
          )}
        />
      )
    },
    {
      key: 'notifications',
      title: 'Notifications',
      component: <NotificationSetting className="max-w-2xl" />
    },
    {
      key: 'integration',
      title: 'Integration',
      component: <IntegrationSetting />
    }
  ]

  return (
    <div className="h-screen w-full">
      {/* Settings Content */}
      <div className="scrollbar-hide w-full flex-1 overflow-y-auto p-4">
        {/* Responsive wrapper */}
        <div className="w-full max-w-2xl lg:mx-12">
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            {/* Left Content */}
            <div className="flex flex-col">
              <h1 className="text-default-foreground text-3xl leading-9 font-bold">
                Settings
              </h1>
              <h2 className="text-small text-default-500 mt-2">
                Customize settings, email preferences, and web appearance.
              </h2>
            </div>

            {/* Right Buttons */}
            <div className="flex w-full gap-2 sm:w-auto">{endContent}</div>
          </div>

          {/* Tabs */}
          <Tabs
            fullWidth
            classNames={{
              base: 'mt-6 w-full ',
              cursor: 'bg-content1 dark:bg-content1',
              panel: 'w-full p-0 pt-4'
            }}>
            {tabItems.map(({ key, title, component }) => (
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
