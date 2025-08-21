'use client'

import { Button, ScrollShadow, Tab, Tabs } from '@heroui/react'
import { useState } from 'react'

import AccountSetting from './account-setting'
import IntegrationSetting from './integration'
import NotificationSetting from './notification'
import ProfileSetting from './profile-setting'
import TeamSetting from './team-setting'

export default function Component() {
  // New state to manage the active tab
  const [activeTab, setActiveTab] = useState('company')

  const tabItems = [
    {
      key: 'company',
      title: 'Company',
      component: <ProfileSetting />
    },
    {
      key: 'account',
      title: 'Account',
      component: <AccountSetting />
    },
    {
      key: 'team',
      title: 'Team',
      component: <TeamSetting />
    },
    {
      key: 'notifications',
      title: 'Notifications',
      component: <NotificationSetting />
    },
    {
      key: 'integration',
      title: 'Integration',
      component: <IntegrationSetting />
    }
  ]

  // Find the currently active tab object
  const activeTabContent = tabItems.find(
    tab => tab.key === activeTab
  )?.component

  return (
    <div className="flex h-screen w-full">
      {/* Settings Content */}
      <div className="scrollbar-hide w-full flex-1 overflow-y-auto p-4">
        {/* Title */}
        <div className="flex items-center">
          <h1 className="text-default-foreground text-3xl leading-9 font-bold">
            Settings
          </h1>
        </div>
        <h2 className="text-small text-default-500 mt-2">
          Customize settings, email preferences, and web appearance.
        </h2>
        {/* Tabs + Controls */}
        <div className="mt-6 flex flex-row flex-wrap items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <ScrollShadow hideScrollBar orientation="horizontal">
              <Tabs
                selectedKey={activeTab}
                onSelectionChange={key => setActiveTab(String(key))}
                classNames={{
                  base: 'w-full max-w-2xl',
                  tabList: 'w-full',
                  cursor: 'bg-content1 dark:bg-content1'
                }}>
                {tabItems.map(({ key, title }) => (
                  <Tab key={key} title={<span>{title}</span>} />
                ))}
              </Tabs>
            </ScrollShadow>
          </div>
          <div className="flex-shrink-0">
            <Button size="md" variant="solid" color="primary">
              Save
            </Button>
          </div>
        </div>
        {/* Tab Content */}
        <div className="mt-4 max-w-2xl">{activeTabContent}</div>
      </div>
    </div>
  )
}
