import { ListboxProps, ListboxSectionProps, Selection } from '@heroui/react'
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
  showInMainContent?: boolean // ✅ New property
}

export type SidebarProps = Omit<ListboxProps<SidebarItem>, 'children'> & {
  items: SidebarItem[]
  isCompact?: boolean
  hideEndContent?: boolean
  iconClassName?: string
  sectionClasses?: ListboxSectionProps['classNames']
  classNames?: ListboxProps['classNames']
  defaultSelectedKey?: string
  selectedKey?: string
  onSelect?: (key: string) => void
  expandedKeys?: Selection
  onExpandedChange?: (keys: Selection) => void
  onNestToggle?: (key: string) => void
  closeDropdown?: () => void
  isVertical?: boolean
}

export type SidebarMenuProps = {
  items: SidebarItem[]
  isCompact?: boolean
  selectedKey?: string
  selectedParentMenu?: SidebarItem | null
  onSelect?: (key: string) => void
  searchValue: string
  setSearchValue: (value: string) => void
  isDarkMode?: boolean
  buttonTextColor?: string
  scrollShadowBg?: string
  textColorClass?: string
  expandedKeys?: Selection
  onExpandedChange?: (keys: Selection) => void
  onNestToggle?: (key: string) => void
}
