export interface ActionButtonProps {
  icon: string
  label: string
  color?: 'default' | 'primary' | 'danger'
  shortcut?: string
}

export interface ActionToolbarProps {
  searchAction?: ActionButtonProps
  viewActions?: ActionButtonProps[]
  otherActions?: ActionButtonProps[]
  className?: string
  isDarkMode?: boolean
}
