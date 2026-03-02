import { ReactNode } from 'react'

import { SidebarItem, SidebarItemType } from './types'

export const longMenuItems: SidebarItem[] = [
  {
    key: 'contacts',
    icon: 'lucide:users',
    href: '/',
    title: 'All'
  },
  {
    key: 'favorites',
    icon: 'lucide:star',
    href: '/favorites',
    title: 'Favorites'
  },
  {
    key: 'groups',
    icon: 'lucide:users-round',
    href: '/groups',
    title: 'Groups'
  },
  {
    key: 'teams',
    icon: 'lucide:users-2',
    href: '/teams',
    title: 'Teams'
  },
  {
    key: 'shared',
    icon: 'lucide:share-2',
    href: '/shared/shared-by-me',
    title: 'Shared'
  },
  {
    key: 'import',
    icon: 'lucide:arrow-left-right',
    href: '/import-export',
    title: 'Import / Export'
  }
]

export const items: SidebarItem[] = [
  {
    key: 'contacts',
    icon: 'lucide:users',
    href: '/',
    title: 'All Contacts'
  },
  {
    key: 'favorites',
    icon: 'lucide:star',
    href: '/favorites',
    title: 'Favorites'
  },
  {
    key: 'groups',
    icon: 'lucide:users-round',
    href: '/groups',
    title: 'Groups'
  },
  {
    key: 'teams',
    icon: 'lucide:users-2',
    href: '/teams',
    title: 'Teams'
  },
  {
    key: 'shared',
    icon: 'lucide:share-2',
    href: '/shared/shared-by-me',
    title: 'Shared'
  },
  {
    key: 'import',
    icon: 'lucide:arrow-left-right',
    href: '/import-export',
    title: 'Import / Export'
  }
]
