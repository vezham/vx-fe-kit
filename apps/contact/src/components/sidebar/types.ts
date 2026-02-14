export type SidebarItem = {
  label: string
  href: string
  count?: number
  filter?: 'all' | 'favorites' | 'groups'
}

export type SidebarProps = {
  sidebar?: SidebarItem[]
  children?: React.ReactNode
}
