import { SidebarItem } from './types'

export const items: SidebarItem[] = [
  {
    key: 'home',
    icon: 'lucide:home',
    href: '/',
    title: 'Home'
  },
  {
    key: 'projects',
    icon: 'lucide:folder',
    title: 'Projects',
    href: '/projects'
  },
  {
    key: 'settings',
    href: '/settings',
    icon: 'lucide:settings',
    title: 'Settings'
  }
]
