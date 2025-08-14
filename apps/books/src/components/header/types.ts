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
  avatars: AvatarData[]
  mainTitle: string
  mainDescription: string
}

export interface DatePickerProps {
  onRefresh?: () => void
  onDownload?: () => void
}
