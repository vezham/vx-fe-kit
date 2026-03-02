'use client'

import React from 'react'

import { Surface } from '@vezham/react/v3'

import { ContainerActions } from '../../components/actions'

export interface AppContainerHeaderProps {
  showSearch?: boolean
  showAdd?: boolean
  showMore?: boolean

  onSearch?: (value: string) => void
  onNewReminder?: () => void
  onNewList?: () => void
}

const AppContainerHeader: React.FC<AppContainerHeaderProps> = ({
  showSearch = false,
  showAdd = true,
  showMore = false,
  onSearch,
  onNewReminder,
  onNewList
}) => {
  const hasActions = showSearch || showAdd || showMore

  return (
    <Surface
      variant="transparent"
      className="flex items-center gap-4 p-4"
      data-vx="container-header">
      {hasActions && (
        <ContainerActions
          showSearch={showSearch}
          showAdd={showAdd}
          showMore={showMore}
          onSearch={onSearch}
          onNewReminder={onNewReminder}
          onNewList={onNewList}
        />
      )}
    </Surface>
  )
}

export default AppContainerHeader
