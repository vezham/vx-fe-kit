'use client'

import { Button, ScrollShadow, Tab, Tabs } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useRouter } from '@tanstack/react-router'
import type { Key } from 'react'
import React, { useState } from 'react'
import ActionBar from '../../layouts/actionbar'
import { SettingsTabsProps } from './types'
import {
  getDescriptionClassName,
  getFirstActionClasses,
  getLayoutClasses,
  getTabsClassNames,
  getTitleClassName
} from './variant'

const Header: React.FC<SettingsTabsProps> = ({
  tabs,
  mainTitle,
  mainDescription,
  showLeftHeader = true,
  isDarkmode = false,
  children
}) => {
  const router = useRouter()
  const onBack = () => router.history.back()

  const [activeTab, setActiveTab] = useState(tabs[0]?.key || '')

  const ChildrenCount = React.Children.count(children)

  const layout = getLayoutClasses(ChildrenCount)
  const tabsClassNames = getTabsClassNames(isDarkmode)
  const titleClass = getTitleClassName()
  const descClass = getDescriptionClassName()
  const actionClass = getFirstActionClasses(isDarkmode)

  const handleTabChange = (key: Key) => {
    setActiveTab(String(key))
  }

  return (
    <div className={layout.container}>
      {/* Header */}
      <div className={layout.headContainer}>
        <div className={layout.leftSection}>
          {showLeftHeader && (
            <Button
              isIconOnly
              radius="full"
              size="sm"
              className={actionClass}
              onPress={() => onBack()}>
              <Icon icon="lucide:chevron-left" width={15} />
            </Button>
          )}
          <div>
            <h1 className={titleClass}>{mainTitle}</h1>
            <h2 className={`${descClass}`}>{mainDescription}</h2>
          </div>
        </div>
        <div className={layout.rightSection}>
          <ActionBar />
        </div>
      </div>

      {/* Tabs + Controls */}
      <div className={layout.tabsWrapper}>
        <div className={`${layout.tabsScroll}`}>
          <ScrollShadow
            hideScrollBar
            className="flex w-full overflow-x-auto"
            orientation="horizontal">
            <Tabs
              size="sm"
              selectedKey={activeTab}
              onSelectionChange={handleTabChange}
              classNames={tabsClassNames}
              fullWidth={tabs.length <= 4}
              className={tabs.length > 4 ? 'flex-nowrap' : ''}>
              {tabs.map(({ key, title }) => (
                <Tab
                  key={key}
                  title={<span className="whitespace-nowrap">{title}</span>}
                  className={
                    tabs.length < 4
                      ? 'flex-1 text-center'
                      : 'max-w-[100px] min-w-[100px] whitespace-nowrap'
                  }
                />
              ))}
            </Tabs>
          </ScrollShadow>
        </div>

        <div className={layout.actionWrapper}>{children}</div>
      </div>

      {/* Tab Content */}
      <div className="mt-4 md:px-5">
        {tabs.find(t => t.key === activeTab)?.content}
      </div>
    </div>
  )
}

export default Header
