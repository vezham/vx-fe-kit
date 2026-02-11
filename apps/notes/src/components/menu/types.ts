import React from 'react'

import { SidebarItem } from '../sidebar/types'

export type MenuItem = {
  label: string
  href: string
}

export type MenuProps = {
  menu?: MenuItem[]
  children?: React.ReactNode
}

// export type MenuLayoutProps = {
//   children?: React.ReactNode
//   sidebar?: SidebarItem[]
//   menu?: MenuItem[]
// }

export type MenuLayoutProps = {
  children?: React.ReactNode
  sidebar?: React.ReactNode
  menu?: MenuItem[]
}
