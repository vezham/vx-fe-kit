export interface SidebarItemProps {
  icon: string
  href: string
  label: string
  count?: number
  active?: boolean
  iconColor?: string
}

export interface SidebarSectionProps {
  title: string
  children: React.ReactNode
}
