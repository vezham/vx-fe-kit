import { SidebarItem } from './types'

export const longMenuItems: SidebarItem[] = [
  {
    key: 'all',
    icon: 'lucide:list',
    href: '/',
    title: 'All'
  },
  {
    key: 'today',
    icon: 'lucide:calendar-check',
    href: '/today',
    title: 'Today'
  },
  {
    key: 'scheduled',
    icon: 'lucide:calendar-clock',
    href: '/scheduled',
    title: 'Scheduled'
  },
  {
    key: 'completed',
    icon: 'lucide:check-circle-2',
    href: '/completed',
    title: 'Completed'
  },
  {
    key: 'flagged',
    icon: 'lucide:flag',
    href: '/flagged',
    title: 'Flagged'
  },
  {
    key: 'archive',
    icon: 'lucide:archive',
    href: '/archive',
    title: 'Archived'
  },
  {
    key: 'list',
    icon: 'lucide:folder',
    href: '/lists',
    title: 'My Lists'
  },
  {
    key: 'trash',
    icon: 'lucide:trash-2',
    href: '/trash',
    title: 'Trash'
  }
]
