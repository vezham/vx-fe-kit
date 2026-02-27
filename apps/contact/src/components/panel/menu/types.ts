import { ReactNode } from 'react'

export type MenuItem = {
  key: string
  title: string
  href?: string
  icon?: string
  endContent?: ReactNode
}

export type MenuProps = {
  items: MenuItem[]
  selectedKey?: string
  onSelect?: (key: string) => void
  iconClassName?: string
}

export type MenuLayoutProps = {
  children?: React.ReactNode
  sidebar?: React.ReactNode
  menu?: React.ReactNode
  header?: React.ReactNode
}
