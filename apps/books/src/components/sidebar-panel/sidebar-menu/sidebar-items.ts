import { ReactNode } from 'react'
import { SidebarItem, SidebarItemType } from './types'

export const items: SidebarItem[] = [
  {
    key: 'home',
    href: '/home',
    icon: 'lucide:home',
    title: 'Home'
  },
  {
    key: 'bank',
    type: SidebarItemType.Nest,
    icon: 'lucide:wallet',
    href: '/bank',
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
        icon: 'lucide:credit-card',
        endContent: '>'
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
    href: '/book',
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
    href: '#',
    icon: 'lucide:bar-chart-2',
    title: 'Reports',
    endContent: '+'
  },
  {
    key: 'widgets',
    href: '#',
    icon: 'lucide:layers',
    title: 'Widgets',
    endContent: 'New' as unknown as ReactNode
  },
  {
    key: 'settings',
    href: '#',
    icon: 'lucide:settings',
    title: 'Settings',
    endContent: '+'
  }
]
