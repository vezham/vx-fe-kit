import { SidebarItem } from '../sidebar-menu/types'

export const longMenuItems: SidebarItem[] = [
  { key: 'home', href: '/home', icon: 'lucide:home', title: 'Home' },
  { key: 'bank', href: '/bank', icon: 'lucide:wallet', title: 'Bank' },
  { key: 'books', href: '/books', icon: 'lucide:library', title: 'Books' },
  {
    key: 'inventory',
    href: '/inventory',
    icon: 'lucide:package',
    title: 'Inventory'
  },
  {
    key: 'reports',
    href: '/reports',
    icon: 'lucide:bar-chart-2',
    title: 'Reports'
  },
  { key: 'widgets', href: '/widgets', icon: 'lucide:layers', title: 'Widgets' },
  {
    key: 'settings',
    href: '/settings',
    icon: 'lucide:settings',
    title: 'Settings'
  },
  { key: 'profile', href: '/profile', icon: 'lucide:user', title: 'Profile' }
]
