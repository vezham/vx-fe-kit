export type SettingItemType = 'toggle' | 'menu'

export interface SettingItem {
  icon: string
  label: string
  type: SettingItemType
  value?: boolean
}

export interface SettingGroup {
  title: string
  items: SettingItem[]
}

export interface SettingsAppProps {
  isOpen: boolean
  onClose: () => void
}
