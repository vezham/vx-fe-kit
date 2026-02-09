export type SidebarItem = {
  label: string
  href: string
}

export type SidebarProps = {
  sidebar?: SidebarItem[]
  children?: React.ReactNode
}
