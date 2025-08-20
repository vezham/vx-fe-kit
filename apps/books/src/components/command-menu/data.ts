// src/components/CommandMenu/data.ts
import { CommandItem, SidebarItem } from './types'

// Function to generate quick actions from sidebar items
export const generateQuickActions = (items: SidebarItem[]): CommandItem[] => {
  return items
    .map(item => {
      const actions = []
      switch (item.key) {
        case 'bank':
          actions.push(
            {
              key: `action-${item.key}-view`,
              title: `View ${item.title} Accounts`,
              icon: 'lucide:eye',
              section: 'quick-actions' as const,
              relatedTo: item.key
            },
            {
              key: `action-${item.key}-add`,
              title: `Add New ${item.title} Account`,
              icon: 'lucide:plus-circle',
              section: 'quick-actions' as const,
              relatedTo: item.key
            }
          )
          break

        case 'books':
          actions.push(
            {
              key: `action-${item.key}-view`,
              title: `Browse ${item.title}`,
              icon: 'lucide:book-open',
              section: 'quick-actions' as const,
              relatedTo: item.key
            },
            {
              key: `action-${item.key}-add`,
              title: `Add New ${item.title}`,
              icon: 'lucide:plus-circle',
              section: 'quick-actions' as const,
              relatedTo: item.key
            }
          )
          break

        case 'inventory':
          actions.push(
            {
              key: `action-${item.key}-view`,
              title: `View ${item.title}`,
              icon: 'lucide:list',
              section: 'quick-actions' as const,
              relatedTo: item.key
            },
            {
              key: `action-${item.key}-add`,
              title: `Add ${item.title} Item`,
              icon: 'lucide:plus-circle',
              section: 'quick-actions' as const,
              relatedTo: item.key
            }
          )
          break

        case 'reports':
          actions.push(
            {
              key: `action-${item.key}-view`,
              title: `View ${item.title}`,
              icon: 'lucide:file-text',
              section: 'quick-actions' as const,
              relatedTo: item.key
            },
            {
              key: `action-${item.key}-generate`,
              title: `Generate New ${item.title}`,
              icon: 'lucide:file-plus',
              section: 'quick-actions' as const,
              relatedTo: item.key
            }
          )
          break

        case 'settings':
          actions.push(
            {
              key: `action-${item.key}-view`,
              title: `Manage ${item.title}`,
              icon: 'lucide:settings',
              section: 'quick-actions' as const,
              relatedTo: item.key
            },
            {
              key: `action-${item.key}-profile`,
              title: `Edit Profile`,
              icon: 'lucide:user',
              section: 'quick-actions' as const,
              relatedTo: item.key
            }
          )
          break

        default:
          actions.push({
            key: `action-${item.key}`,
            title: `Manage ${item.title}`,
            icon: item.icon || 'lucide:settings',
            section: 'quick-actions' as const,
            relatedTo: item.key
          })
          break
      }
      return actions
    })
    .flat()
}

// Function to generate navigation items
export const generateNavigationItems = (
  items: SidebarItem[]
): CommandItem[] => {
  return items.map(item => ({
    key: item.key,
    title: item.title,
    icon: item.icon || 'lucide:circle',
    section: 'navigation' as const,
    href: item.href
  }))
}

// Function to generate recent search items
export const generateRecentSearchItems = (history: string[]): CommandItem[] => {
  return history.map(term => ({
    key: `search-${term}`,
    title: term,
    icon: 'lucide:clock',
    section: 'recent-searches' as const
  }))
}
