import { Button, Input, Kbd, Modal, ModalContent } from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'

import {
  generateNavigationItems,
  generateQuickActions,
  generateRecentSearchItems
} from './data'
import { CommandMenuProps } from './types'
import { commandMenuStyles } from './variant'

const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  onOpenChange,
  items,
  isDarkMode,
  onSelect
}) => {
  const [searchValue, setSearchValue] = React.useState('')
  const [searchHistory, setSearchHistory] = React.useState<string[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Load search history from localStorage on mount
  React.useEffect(() => {
    const savedHistory = localStorage.getItem('commandMenuSearchHistory')
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error('Failed to parse search history', e)
      }
    }
  }, [])

  // Save search history to localStorage when it changes
  React.useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem(
        'commandMenuSearchHistory',
        JSON.stringify(searchHistory)
      )
    }
  }, [searchHistory])

  // Focus input when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else {
      setSearchValue('')
    }
  }, [isOpen])

  // Handle search submission
  const handleSearch = () => {
    if (searchValue.trim()) {
      // Add to search history if not already present
      setSearchHistory(prev => {
        const newHistory = [
          searchValue.trim(),
          ...prev.filter(item => item !== searchValue.trim())
        ]
        return newHistory.slice(0, 5)
      })
    }
  }

  // Handle search on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // Add item to search history when selected
  const handleItemSelect = (key: string, href?: string, title?: string) => {
    // If we're searching and select an item, add the search term to history
    if (searchValue.trim()) {
      handleSearch()
    }

    // If we select a navigation item, add its title to search history
    if (title) {
      setSearchHistory(prev => {
        const newHistory = [title, ...prev.filter(item => item !== title)]
        return newHistory.slice(0, 5)
      })
    }

    // Call the original onSelect
    onSelect(key, href)
  }

  const handleClearRecentSearches = () => {
    setSearchHistory([])
    localStorage.removeItem('commandMenuSearchHistory')
  }

  // Generate all items using the data functions
  const navigationItems = generateNavigationItems(items)
  const quickActionItems = React.useMemo(
    () => generateQuickActions(items),
    [items]
  )
  const recentSearchItems = generateRecentSearchItems(searchHistory)
  const allCommandItems = [
    ...recentSearchItems,
    ...quickActionItems,
    ...navigationItems
  ]

  // Filter items based on search
  const filteredItems = React.useMemo(() => {
    if (!searchValue.trim()) {
      return allCommandItems
    }
    const query = searchValue.toLowerCase()
    return allCommandItems.filter(item =>
      item.title.toLowerCase().includes(query)
    )
  }, [allCommandItems, searchValue])

  // Group filtered items by section
  const groupedItems = React.useMemo(() => {
    const grouped = {
      'recent-searches': filteredItems.filter(
        item => item.section === 'recent-searches'
      ),
      'quick-actions': filteredItems.filter(
        item => item.section === 'quick-actions'
      ),
      navigation: filteredItems.filter(item => item.section === 'navigation')
    }
    return Object.entries(grouped).filter(([_, items]) => items.length > 0)
  }, [filteredItems])

  // Determine what sections to show initially
  const sectionsToShow = React.useMemo(() => {
    if (searchValue.trim()) {
      return groupedItems
    }
    const sections: any[] = []
    if (recentSearchItems.length > 0) {
      sections.push(['recent-searches', recentSearchItems])
    }
    sections.push(['quick-actions', quickActionItems])
    sections.push(['navigation', navigationItems])
    return sections
  }, [
    groupedItems,
    searchValue,
    recentSearchItems,
    quickActionItems,
    navigationItems
  ])

  // Handle global keyboard shortcuts
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!isOpen)
      } else if (e.key === 'Escape' && isOpen) {
        onOpenChange(false)
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [isOpen, onOpenChange])

  // Render a command item
  const renderCommandItem = (item: any) => (
    <div
      key={item.key}
      className={commandMenuStyles.commandItem.base(isDarkMode)}
      onClick={() => {
        if (item.section === 'recent-searches') {
          setSearchValue(item.title)
          inputRef.current?.focus()
        } else {
          handleItemSelect(item.key, item.href, item.title)
          onOpenChange(false)
        }
      }}>
      <div className={commandMenuStyles.commandItem.iconWrapper(isDarkMode)}>
        <Icon
          icon={item.icon}
          width={16}
          className={commandMenuStyles.commandItem.icon(isDarkMode)}
        />
      </div>
      <span className={commandMenuStyles.commandItem.title}>{item.title}</span>
      {item.hasChildren && (
        <Icon
          icon="lucide:chevron-right"
          width={16}
          className={commandMenuStyles.commandItem.chevronIcon(isDarkMode)}
        />
      )}
    </div>
  )

  // Render a section of command items
  const renderSection = (title: string, items: any[]) => {
    let sectionTitle = ''
    switch (title) {
      case 'quick-actions':
        sectionTitle = 'Quick Actions'
        break
      case 'navigation':
        sectionTitle = 'Navigation'
        break
      case 'recent-searches':
        sectionTitle = 'Recent Searches'
        break
      default:
        sectionTitle = title
    }

    // return (
    //   <div key={title} className="mb-4">
    //     <div className={commandMenuStyles.sectionTitle(isDarkMode)}>{sectionTitle}</div>
    //     <div className={commandMenuStyles.sectionItems}>
    //       {items.map(renderCommandItem)}
    //     </div>
    //   </div>
    // )

    return (
      <div key={title} className="mb-4">
        <div className="flex items-center justify-between px-3 py-1">
          <div className={commandMenuStyles.sectionTitle(isDarkMode)}>
            {sectionTitle}
          </div>
          {title === 'recent-searches' && (
            <button
              onClick={handleClearRecentSearches}
              className="text-xs font-medium hover:underline">
              CLEAR
            </button>
          )}
        </div>
        <div className={commandMenuStyles.sectionItems}>
          {items.map(renderCommandItem)}
        </div>
      </div>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      backdrop="blur"
      hideCloseButton // <-- ✅ hides the default modal close button
      classNames={commandMenuStyles.modal(isDarkMode)}>
      <ModalContent>
        {() => (
          <div className={commandMenuStyles.modalContent}>
            <div className="relative">
              <Input
                ref={inputRef}
                autoFocus
                placeholder="Search or Jump to..."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                startContent={
                  <Icon
                    icon="lucide:search"
                    className={commandMenuStyles.input.startContent(isDarkMode)}
                    width={18}
                  />
                }
                endContent={
                  <div className="flex items-center gap-2">
                    {searchValue && (
                      <Button
                        isIconOnly
                        variant="light"
                        radius="full"
                        onPress={() => setSearchValue('')}
                        className="flex h-6 w-6 min-w-0 items-center justify-center rounded-full border p-0">
                        <Icon
                          icon="lucide:x"
                          width={12} // ✅ smaller icon
                          height={12}
                          className={commandMenuStyles.input.startContent(
                            isDarkMode
                          )}
                        />
                      </Button>
                    )}
                    <Kbd
                      className={commandMenuStyles.input.endContentKbd(
                        isDarkMode
                      )}>
                      esc
                    </Kbd>
                  </div>
                }
                className={commandMenuStyles.input.base(isDarkMode)}
                size={commandMenuStyles.input.size as any}
                variant={commandMenuStyles.input.variant as any}
              />
            </div>
            <div className="mt-2 max-h-[400px] overflow-y-auto">
              {sectionsToShow.length > 0 ? (
                sectionsToShow.map(([section, items]) =>
                  renderSection(section, items as any[])
                )
              ) : (
                <div className={commandMenuStyles.noResults(isDarkMode)}>
                  <p className={commandMenuStyles.noResultsTitle}>
                    No results for "{searchValue}"
                  </p>
                  <p className={commandMenuStyles.noResultsSubtitle}>
                    Try searching for something else
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  )
}

export default CommandMenu
