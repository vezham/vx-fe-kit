import { ReactNode } from 'react'

export type ActiveInfoPanel = 'bookmarks1' | 'disc1' | 'ai' | null

export interface InfoPanelContextValue {
  activeInfoPanel: ActiveInfoPanel
  isOpen: boolean
  setActiveInfoPanel: (panel: ActiveInfoPanel) => void
  openInfoPanel: (panel: Exclude<ActiveInfoPanel, null>) => void
  closeInfoPanel: () => void
  toggleInfoPanel: (panel: Exclude<ActiveInfoPanel, null>) => void
}

export interface InfoPanelDefinition {
  title: string
  content: ReactNode
}
