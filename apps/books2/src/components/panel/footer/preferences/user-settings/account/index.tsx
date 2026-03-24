import React from 'react'

import { Tabs } from '@vezham/react/v3'

const index = () => {
  return (
    <div>
      <Tabs className="w-full" variant="secondary">
        <Tabs.ListContainer>
          <Tabs.List aria-label="Options">
            <Tabs.Tab id="security">
              Security
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="standing">
              Standing
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="pt-4" id="security">
          <p>View your project overview and recent activity.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="standing">
          <p>Track your metrics and analyze performance data.</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

export default index
