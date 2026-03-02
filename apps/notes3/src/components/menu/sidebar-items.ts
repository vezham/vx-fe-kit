import { ReactNode } from 'react'

import { SidebarItem } from './types'

export const longMenuItems: SidebarItem[] = [
  {
    key: 'all',
    icon: 'lucide:users',
    href: '/',
    title: 'All'
  },
  {
    key: 'pinned',
    icon: 'lucide:pin',
    href: '/pinned',
    title: 'Pinned'
  },
  {
    key: 'folders',
    icon: 'lucide:folder',
    href: '/folders',
    title: 'Folders'
  },
  {
    key: 'archived',
    icon: 'lucide:archive',
    href: '/archived',
    title: 'Archived'
  },
  {
    key: 'trash',
    icon: 'lucide:trash-2',
    href: '/trash',
    title: 'Trash'
  }
]
