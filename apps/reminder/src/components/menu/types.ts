import React from 'react'

import { HeaderItem } from '../header/types'

export type MenuItem = {
  label: string
  href: string
}

export type MenuProps = {
  menu?: MenuItem[]
  children?: React.ReactNode
}

export type MenuLayoutProps = {
  children?: React.ReactNode
  sidebar?: React.ReactNode
  header?: HeaderItem[]

  menu?: MenuItem[]
}
