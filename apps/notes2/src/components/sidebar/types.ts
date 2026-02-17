export type SidebarItem = {
  label: string
  href: string
  count?: number
}

export type SidebarProps = {
  sidebar?: SidebarItem[]
  children?: React.ReactNode
}
