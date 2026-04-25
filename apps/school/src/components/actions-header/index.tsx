'use client'

import { Icon } from '@iconify/react'
import { useMemo, useState } from 'react'

import { Button, Dropdown, Input, Kbd, Label, Tabs } from '@vezham/react/v3'

export interface ActionItem {
  key: string
  label: string
  icon?: string
  shortcut?: string
  onAction?: (pageKey: string) => void
  isVisible?: (pageKey: string) => boolean
}

export interface TabItem {
  key: string
  title: string
  icon?: string
  isDisabled?: boolean
}

export interface DynamicHeaderProps {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (tabKey: string) => void

  actions?: ActionItem[]

  showSearch?: boolean
  onSearch?: (value: string, pageKey: string) => void

  leftActions?: ActionItem[]
}

export default function DynamicHeader({
  tabs,
  activeTab,
  onTabChange,
  actions = [],
  showSearch = true,
  onSearch,
  leftActions = []
}: DynamicHeaderProps) {
  const [search, setSearch] = useState('')

  const handleSearch = (val: string) => {
    setSearch(val)
    onSearch?.(val, activeTab)
  }

  const visibleActions = useMemo(() => {
    return actions.filter(a => !a.isVisible || a.isVisible(activeTab))
  }, [actions, activeTab])

  const visibleLeftActions = useMemo(() => {
    return leftActions.filter(a => !a.isVisible || a.isVisible(activeTab))
  }, [leftActions, activeTab])

  const createAction = visibleActions.find(
    a => a.key === 'create' || a.label.toLowerCase().includes('create')
  )

  const otherActions = visibleActions.filter(a => a !== createAction)

  return (
    <div className="bg-background flex w-full flex-col gap-3 border-b px-4 py-3">
      <div className="flex gap-3">
        <div className="flex min-w-[120px] flex-shrink-0 items-center gap-2">
          {visibleLeftActions.map(action => (
            <Button
              key={action.key}
              onPress={() => action.onAction?.(activeTab)}
              size="sm"
              variant="light">
              {action.icon && <Icon icon={action.icon} />}
            </Button>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-center gap-2">
          {tabs.length > 0 && (
            <Tabs
              selectedKey={activeTab}
              onSelectionChange={k => onTabChange(String(k))}>
              <Tabs.ListContainer>
                <Tabs.List aria-label="Navigation Tabs">
                  {tabs.map(tab => (
                    <Tabs.Tab key={tab.key} isDisabled={tab.isDisabled}>
                      <div className="flex items-center gap-2 px-2 py-1">
                        {tab.icon && (
                          <Icon icon={tab.icon} className="h-4 w-4" />
                        )}
                        {tab.title}
                      </div>
                      <Tabs.Indicator />
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
              </Tabs.ListContainer>
              {tabs.map(tab => (
                <Tabs.Panel key={tab.key} />
              ))}
            </Tabs>
          )}
        </div>

        <div className="flex items-center gap-2">
          {showSearch && (
            <Input
              value={search}
              onChange={e => handleSearch(e.target.value)}
              placeholder="Search"
              startContent={<Icon icon="lucide:search" className="h-4 w-4" />}
            />
          )}

          {otherActions.length > 0 && (
            <Dropdown>
              <Dropdown.Trigger>
                <Button isIconOnly variant="light">
                  <Icon icon="lucide:more-vertical" />
                </Button>
              </Dropdown.Trigger>

              <Dropdown.Popover>
                <Dropdown.Menu>
                  {otherActions.map(action => (
                    <Dropdown.Item
                      key={action.key}
                      onSelect={() => action.onAction?.(activeTab)}>
                      <Label className="flex items-center gap-2">
                        {action.icon && <Icon icon={action.icon} />}
                        {action.label}
                      </Label>

                      {action.shortcut && (
                        <Kbd slot="keyboard">{action.shortcut}</Kbd>
                      )}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}

          {createAction && (
            <Button onPress={() => createAction.onAction?.(activeTab)}>
              {createAction.icon && <Icon icon={createAction.icon} />}
              {createAction.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
