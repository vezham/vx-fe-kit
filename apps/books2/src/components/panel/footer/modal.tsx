'use client'

import { Icon } from '@iconify/react'
import { useState } from 'react'

import { Button, Surface, Tabs } from '@vezham/react/v3'

type Props = {
  open: boolean
  onClose: () => void
}

export default function UserInfoModal({ open, onClose }: Props) {
  const [activeTab, setActiveTab] = useState('profile')

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Surface className="relative w-[500px] rounded-2xl p-6">
        <Button
          isIconOnly
          variant="ghost"
          className="absolute top-4 right-4"
          onPress={onClose}>
          <Icon icon="solar:close-circle-linear" width={22} />
        </Button>

        <Tabs
          orientation="vertical"
          selectedKey={activeTab}
          onSelectionChange={k => setActiveTab(String(k))}
          className="flex">
          <Tabs.ListContainer className="border-default-200 border-r pr-4">
            <Tabs.List aria-label="Settings">
              <Tabs.Tab id="profile">
                <div className="flex items-center gap-2">
                  <Icon icon="solar:user-linear" width={18} />
                  Profile
                </div>
                <Tabs.Indicator />
              </Tabs.Tab>

              <Tabs.Tab id="credits">
                <div className="flex items-center gap-2">
                  <Icon icon="solar:wallet-linear" width={18} />
                  Credits
                </div>
                <Tabs.Indicator />
              </Tabs.Tab>

              <Tabs.Tab id="plans">
                <div className="flex items-center gap-2">
                  <Icon icon="solar:card-linear" width={18} />
                  Plans
                </div>
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>

          <div className="flex-1">
            <Tabs.Panel id="profile">
              <h2 className="mb-2 text-xl font-semibold">Account</h2>
              <p className="text-muted">Account settings content</p>
            </Tabs.Panel>

            <Tabs.Panel id="credits">
              <h2 className="mb-2 text-xl font-semibold">Credits</h2>
              <p className="text-muted">Credits content</p>
            </Tabs.Panel>

            <Tabs.Panel id="plans">
              <h2 className="mb-2 text-xl font-semibold">Plans</h2>
              <p className="text-muted">Plans content</p>
            </Tabs.Panel>
          </div>
        </Tabs>
      </Surface>
    </div>
  )
}
