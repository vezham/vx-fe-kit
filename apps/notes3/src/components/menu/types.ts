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
}

export interface BottomNavbarProps {
  items: SidebarItem[]
  selectedKey: string
  onSelect: (key: string) => void
  isDarkMode?: boolean
  hasMoreAction?: boolean // New prop to handle the > 5 menu items scenario
  bgColorClass?: string
  textColorClass?: string
  buttonTextColor?: string
}

export interface BottomDrawerMenuProps {
  items: SidebarItem[]
  selectedKey: string
  onSelect: (key: string) => void
  isOpen: boolean
  onClose: () => void
  isDarkMode?: boolean
  bgColorClass?: string
  buttonTextColor?: string
}

export type MenuDrawerProps = {
  items: SidebarItem[]
  selectedKey: string
  onItemSelect: (item: SidebarItem) => void
  isOpen: boolean
  onClose: () => void
  isDarkMode?: boolean
  buttonTextColor?: string
}
