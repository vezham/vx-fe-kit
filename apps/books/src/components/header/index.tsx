'use client'

import { Button, ScrollShadow, Tab, Tabs } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useRouter } from '@tanstack/react-router'
import type { Key } from 'react'
import React, { useState } from 'react'

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
  showLeftHeader = false,
  isDarkmode = false,
  // children,
  endContent
}) => {
  const router = useRouter()
  const onBack = () => router.history.back()

  const [activeTab, setActiveTab] = useState(tabs[0]?.key || '')

  const layout = getLayoutClasses()
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
              size="md"
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
      </div>

      {/* Tabs + Controls */}
      <div className={layout.tabsWrapper}>
        <div className={`${layout.tabsScroll}`}>
          <ScrollShadow
            hideScrollBar
            className="flex overflow-x-auto"
            orientation="horizontal">
            <Tabs
              size="sm"
              selectedKey={activeTab}
              onSelectionChange={handleTabChange}
              classNames={tabsClassNames}
              fullWidth>
              {tabs.map(({ key, title }) => (
                <Tab key={key} title={<span>{title}</span>} />
              ))}
            </Tabs>
          </ScrollShadow>
        </div>

        <div className={layout.actionWrapper}>{endContent}</div>
      </div>

      {/* Tab Content */}
      <div className="mt-5 max-w-2xl">
        {tabs.find(t => t.key === activeTab)?.content}
      </div>
    </div>
  )
}

export default Header
