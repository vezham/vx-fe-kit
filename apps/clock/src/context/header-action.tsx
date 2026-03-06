import React from 'react'

export type HeaderActions = {
  showSearch?: boolean
  showAdd?: boolean
  showMore?: boolean
  onAdd?: () => void
  onSearch?: (value: string) => void
}

export const HeaderActionContext = React.createContext<
  (actions: HeaderActions) => void
>(() => null)
