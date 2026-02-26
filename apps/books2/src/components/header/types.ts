export interface HeaderProps {
  isCompact: boolean
  isRightSidebar: boolean
  toggleVisibility: () => void
  buttonTextColor: string
}

export interface SidebarHeaderExtendedProps extends HeaderProps {
  onSlackClick: () => void
  isPopoverOpen: boolean
  setPopoverOpen: (open: boolean) => void
}
