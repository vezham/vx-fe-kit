import { ReactNode } from 'react'

import { SidebarItem } from './types'

export const items: SidebarItem[] = [
  {
    key: 'bank',
    icon: 'lucide:wallet',
    // href: '#',
    title: 'Bank'
  },
  {
    key: 'books',
    icon: 'lucide:library',
    title: 'Books',
    href: '/books'
  },
  {
    key: 'inventory',
    // href: '#',
    icon: 'lucide:package',
    title: 'Inventory',
    showInMainContent: true
  },
  {
    key: 'reports',
    href: '/reports',
    icon: 'lucide:bar-chart-2',
    title: 'Reports',
    endContent: '+',
    showInMainContent: true
  },
  {
    key: 'widgets',
    // href: "/wid",
    icon: 'lucide:layers',
    title: 'Widgets',
    endContent: 'New' as unknown as ReactNode,
    showInMainContent: false
  },
  {
    key: 'settings',
    href: '/settings',
    icon: 'lucide:settings',
    title: 'Settings',
    endContent: '+',
    showInMainContent: true
  }
]
