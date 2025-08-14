import { ReactNode } from 'react'

export enum SidebarItemType {
  Nest = 'nest'
}

export type SidebarItem = {
  key: string
  title: string
  href?: string
  icon?: string
  startContent?: ReactNode
  endContent?: ReactNode
  items?: SidebarItem[]
  type?: SidebarItemType
  isSelected?: boolean
  showInMainContent?: boolean
  onClick?: () => void
}

export type SidebarProps = {
  items: SidebarItem[]
  selectedKey?: string
  onSelect?: (key: string) => void
  expandedKeys?: Set<string>
  onExpandedChange?: (keys: Set<string> | undefined) => void
  isCompact?: boolean
  hideEndContent?: boolean
  iconClassName?: string
  onNestToggle?: (key: string) => void
  searchValue?: string // add this
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>
  iaDarkMode?: boolean
  buttonTextColor?: string
  scrollShadowBg?: string
  textColorClass?: string
}

export type SidebarMenuProps = {
  items: SidebarItem[]
  selectedKey?: string
  selectedParentMenu?: SidebarItem | null
  onSelect?: (key: string) => void
  isCompact?: boolean
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  isDarkMode?: boolean
  buttonTextColor?: string
  scrollShadowBg?: string
  textColorClass?: string
  expandedKeys?: Set<string>
  onExpandedChange?: (keys: Set<string> | undefined) => void
  onNestToggle?: (key: string) => void
}
