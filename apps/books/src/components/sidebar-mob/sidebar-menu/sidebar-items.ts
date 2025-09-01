import { ReactNode } from 'react'
import { SidebarItem, SidebarItemType } from '../sidebar-menu/types'

export const longMenuItems: SidebarItem[] = [
  {
    key: 'home',
    href: '/',
    icon: 'lucide:home',
    title: 'Home'
  },
  {
    key: 'chat',
    href: '/chat',
    icon: 'lucide:message-square',
    title: 'Chat'
  },
  {
    key: 'bank',
    type: SidebarItemType.Nest,
    icon: 'lucide:wallet',
    href: '#',
    title: 'Bank',

    items: [
      {
        key: 'dashboard',
        href: '/dashboard',
        title: 'Dashboard',
        icon: 'lucide:layout-dashboard'
      },
      {
        key: 'accounts',
        href: '#',
        title: 'Accounts',
        icon: 'lucide:credit-card'
      },
      {
        key: 'overview',
        href: '#',
        title: 'Overview',
        icon: 'lucide:pie-chart'
      },
      {
        key: 'transactions',
        href: '#',
        title: 'Transactions',
        icon: 'lucide:list'
      },
      {
        key: 'transactions-log',
        href: '#',
        title: 'Transactions Log',
        icon: 'lucide:clipboard-list'
      },
      {
        key: 'reconciliation',
        href: '#',
        title: 'Bank Reconciliation',
        icon: 'lucide:check-square'
      }
    ]
  },
  {
    key: 'books',
    type: SidebarItemType.Nest,
    icon: 'lucide:library',
    title: 'Books',
    href: '/books',

    items: [
      {
        key: 'sales',
        href: '/sales',
        title: 'Sales',
        icon: 'lucide:trending-up'
      },
      {
        key: 'purchase',
        href: '#',
        title: 'Purchase',
        icon: 'lucide:shopping-cart'
      }
    ]
  },
  {
    key: 'inventory',
    href: '#',
    icon: 'lucide:package',
    title: 'Inventory'
  },
  {
    key: 'reports',
    href: '/reports',
    icon: 'lucide:bar-chart-2',
    title: 'Reports',
    endContent: '+'
  },
  {
    key: 'widgets',
    // href: "/wid",
    icon: 'lucide:layers',
    title: 'Widgets',
    endContent: 'New' as unknown as ReactNode
  },
  {
    key: 'settings',
    href: '/settings',
    icon: 'lucide:settings',
    title: 'Settings',
    endContent: '+'
  }
]
