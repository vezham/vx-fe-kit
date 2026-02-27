'use client'

import React from 'react'

import { Surface } from '@vezham/react/v3'

import { ContainerActions } from '../../components/actions'

export interface AppContainerHeaderProps {
  /* Action Controls */
  showSearch?: boolean
  showAdd?: boolean
  showMore?: boolean

  onSearch?: (value: string) => void
  onAdd?: () => void
}

const AppContainerHeader: React.FC<AppContainerHeaderProps> = ({
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
