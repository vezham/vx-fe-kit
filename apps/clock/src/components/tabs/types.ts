export interface ContainerTabItem {
  key: string
  title: string
  href: string
  content?: React.ReactNode
}

export interface ContainerTabsProps {
  tabs: ContainerTabItem[]
  selectedKey: string
  onSelectionChange: (key: string) => void
}
