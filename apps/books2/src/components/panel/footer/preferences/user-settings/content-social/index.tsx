import React from 'react'

import { Tabs } from '@vezham/react/v3'

const index = () => {
  return (
    <div>
      <Tabs className="w-full" variant="secondary">
        <Tabs.ListContainer>
          <Tabs.List aria-label="Options">
            <Tabs.Tab id="discord">
              Discord
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="games">
              Connected Games
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="pt-4" id="discord">
          <p>View your project overview and recent activity.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="games">
          <p>Track your metrics and analyze performance data.</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

export default index
