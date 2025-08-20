// src/components/CommandMenu/types.ts

// The original SidebarItem type, assuming it's used elsewhere
export interface SidebarItem {
  key: string
  title: string
  icon?: string
  href?: string
  hasChildren?: boolean
}

// Interface for a single item in the command menu
export interface CommandItem {
  key: string
  title: string
  icon: string
  section: 'recent-searches' | 'quick-actions' | 'navigation'
  href?: string
  relatedTo?: string
}

// Props for the main CommandMenu component
export interface CommandMenuProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  items: SidebarItem[]
  onSelect: (key: string, href?: string) => void
  selectedKey?: string
  isDarkMode?: boolean
}
