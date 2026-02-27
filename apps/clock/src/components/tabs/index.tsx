'use client'

import React from 'react'

import { Surface, Tabs } from '@vezham/react/v3'

import { ContainerTabsProps } from './types'

export const ContainerTabs: React.FC<ContainerTabsProps> = ({
  tabs,
  selectedKey,
  onSelectionChange
}) => {
  return (
    <Surface
      variant="transparent"
      className="flex w-full min-w-0 items-center justify-center">
      <Tabs
        className="w-[250px] sm:w-auto"
        selectedKey={selectedKey}
        onSelectionChange={key => onSelectionChange(String(key))}>
        <Tabs.ListContainer className="w-full min-w-0">
          <div className="scrollbar-hide w-full overflow-x-auto rounded-full">
            <Tabs.List
              aria-label="Options"
              className="flex w-max min-w-full whitespace-nowrap">
              {tabs.map(tab => (
                <Tabs.Tab key={tab.key} id={tab.key}>
                  {tab.title}
                  <Tabs.Indicator />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </div>
        </Tabs.ListContainer>
      </Tabs>
    </Surface>
  )
}
