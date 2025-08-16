// types.ts

export interface TabData {
  key: string
  title: string
  description?: string // optional per-tab description if needed
  content: React.ReactNode
}

export interface AvatarData {
  name: string
  src: string
}

export interface SettingsTabsProps {
  tabs: TabData[]
  mainTitle: string
  mainDescription: string
  children: React.ReactNode
  showLeftHeader?: boolean
  isDarkmode?: boolean
}

export interface DatePickerProps {
  onRefresh?: () => void
  onDownload?: () => void
  isDarkMode?: boolean
}
