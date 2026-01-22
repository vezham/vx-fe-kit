import { SidebarItem } from '../sidebar-menu/types'

export const longMenuItems: SidebarItem[] = [
  {
    key: 'home',
    href: '/',
    icon: 'lucide:home',
    title: 'Home'
  },
  {
    key: 'projects',
    href: '/projects',
    icon: 'lucide:folder',
    title: 'Projects'
  },
  {
    key: 'teams',
    href: '/teams',
    icon: 'lucide:user-round',
    title: 'Teams'
  },
  {
    key: 'settings',
    href: '/settings',
    icon: 'lucide:settings',
    title: 'Settings'
  }
]
