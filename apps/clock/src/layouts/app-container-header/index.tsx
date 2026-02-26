'use client'

import React from 'react'

import { Surface } from '@vezham/react/v3'

import { ContainerActions } from '../../components/actions'
import { ContainerTabs } from '../../components/tabs'
import { ContainerTabItem } from '../../components/tabs/types'

export interface AppContainerHeaderProps {
  tabs: ContainerTabItem[]
  selectedKey: string
  onTabChange: (key: string) => void

  /* Action Controls */
  showSearch?: boolean
  showAdd?: boolean
  showMore?: boolean

  onSearch?: (value: string) => void
  onAdd?: () => void
}

const AppContainerHeader: React.FC<AppContainerHeaderProps> = ({
  tabs,
  selectedKey,
  onTabChange,
  showSearch = false,
  showAdd = true,
  showMore = false,
  onSearch,
  onAdd
}) => {
  const hasActions = showSearch || showAdd || showMore

  return (
    <Surface
      variant="transparent"
      className="flex items-center gap-4 p-4"
      data-vx="container-header">
      <ContainerTabs
        tabs={tabs}
        selectedKey={selectedKey}
        onSelectionChange={onTabChange}
      />

      {hasActions && (
        <ContainerActions
          showSearch={showSearch}
          showAdd={showAdd}
          showMore={showMore}
          onSearch={onSearch}
          onAdd={onAdd}
        />
      )}
    </Surface>
  )
}

export default AppContainerHeader
