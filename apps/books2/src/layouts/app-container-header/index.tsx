'use client'

import React from 'react'

import { Surface } from '@vezham/react/v3'

import { ContainerActions } from '../../components/actions'
import { ContainerTabs } from '../../components/tabs'
import { ContainerTabItem } from '../../components/tabs/types'

export interface AppContainerHeaderProps {
  tabs?: ContainerTabItem[]
  selectedKey?: string
  onTabChange?: (key: string) => void

  showSearch?: boolean
  showAdd?: boolean
  showMore?: boolean

  onSearch?: (value: string) => void
  onAdd?: () => void
}

const AppContainerHeader: React.FC<AppContainerHeaderProps> = ({
  tabs = [],
  selectedKey,
  onTabChange,

  showSearch = true,
  showAdd = true,
  showMore = true,

  onSearch,
  onAdd
}) => {
  const hasTabs = tabs.length > 0
  const hasActions = showSearch || showAdd || showMore

  return (
    <Surface
      variant="transparent"
      className="flex items-center"
      data-vx="container-header">
      <div className="flex-1" />

      {hasTabs && selectedKey && onTabChange && (
        <div className="flex justify-center">
          <ContainerTabs
            tabs={tabs}
            selectedKey={selectedKey}
            onSelectionChange={onTabChange}
          />
        </div>
      )}

      {hasActions && (
        <div className="flex flex-1 justify-end">
          <ContainerActions
            showSearch={showSearch}
            showAdd={showAdd}
            showMore={showMore}
            onSearch={onSearch}
            onAdd={onAdd}
          />
        </div>
      )}

      {!hasActions && <div className="flex-1" />}
    </Surface>
  )
}

export default AppContainerHeader
