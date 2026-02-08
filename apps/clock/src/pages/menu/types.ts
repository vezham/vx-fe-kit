import React from 'react'

export type MenuItem = {
  label: string
  href: string
}

export type MenuProps = {
  menu?: MenuItem[]
}

export type MenuLayoutProps = {
  children?: React.ReactNode
  sidebar?: React.ReactNode
  menu?: MenuItem[]
}
