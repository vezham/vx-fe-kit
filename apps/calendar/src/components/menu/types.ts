import React from 'react'

import { HeaderItem } from '../header/types'

export type MenuItem = {
  label: string
  href: string
}

export type CalendarItem = {
  id: string
  label: string
  value: string
  color?: string
  disabled?: boolean
}

export type CalendarSection = {
  title: string
  items: CalendarItem[]
}

export type CalendarSidebarProps = {
  sections: CalendarSection[]
  selectedValues: string[]
  onChange: (values: string[]) => void
}

export type MenuLayoutProps = {
  children?: React.ReactNode
  sidebar?: React.ReactNode
  calendarMenu?: React.ReactNode
  header?: HeaderItem[]
}
