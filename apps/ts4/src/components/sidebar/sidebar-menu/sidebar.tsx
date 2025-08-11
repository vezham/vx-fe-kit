'use client'

import {
  Accordion,
  AccordionItem,
  Button,
  cn,
  Listbox,
  ListboxItem,
  ListboxSection,
  Tooltip,
  type ListboxProps,
  type ListboxSectionProps,
  type Selection
} from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'
import { SidebarItem, SidebarItemType } from './types'
import {
  getItemClasses,
  getListboxItemBaseClass,
  getListboxItemTitleClass,
  getSectionClasses
} from './variant'

export type SidebarProps = Omit<ListboxProps<SidebarItem>, 'children'> & {
  items: SidebarItem[]
  isCompact?: boolean
  hideEndContent?: boolean
  iconClassName?: string
  sectionClasses?: ListboxSectionProps['classNames']
  classNames?: ListboxProps['classNames']
  defaultSelectedKey?: string
  selectedKey?: string
  onSelect?: (key: string) => void
  expandedKeys?: Selection
  onExpandedChange?: (keys: Selection) => void
  onNestToggle?: (key: string) => void
  closeDropdown?: () => void
  isVertical?: boolean
  isDarkMode?: boolean
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      items,
      isCompact,
      selectedKey,
      defaultSelectedKey,
      onSelect,
      hideEndContent,
      sectionClasses: sectionClassesProp = {},
      itemClasses: itemClassesProp = {},
      iconClassName,
      classNames,
      className,
      expandedKeys,
      onExpandedChange,
      onNestToggle,
      closeDropdown,
      isVertical = true,
      isDarkMode,
      ...props
    },
    ref
  ) => {
    const [selected, setSelected] = React.useState<React.Key>(
      selectedKey ?? defaultSelectedKey ?? ''
    )

    React.useEffect(() => {
      if (selectedKey !== undefined) setSelected(selectedKey)
    }, [selectedKey])

    const [internalExpandedKeys, setInternalExpandedKeys] =
      React.useState<Selection>(expandedKeys || new Set([]))

    const actualExpandedKeys = expandedKeys || internalExpandedKeys
    const actualOnExpandedChange = onExpandedChange || setInternalExpandedKeys

    const sectionClasses = getSectionClasses({
      isCompact,
      isVertical,
      sectionClassesProp
    })

    const itemClasses = getItemClasses({
      isCompact,
      itemClassesProp
    })

    const renderNestItem = React.useCallback(
      (item: SidebarItem) => {
        const isNestType =
          item.items &&
          item.items.length > 0 &&
          item.type === SidebarItemType.Nest

        if (isNestType) {
          // Remove href to prevent navigation on nest parent
          delete item.href
        }

        return (
          <ListboxItem
            {...item}
            key={item.key}
            classNames={{
              base: cn(
                {
                  'h-auto p-0': !isCompact && isNestType
                },
                {
                  'inline-block w-11': isCompact && isNestType
                }
              )
            }}
            onPress={() => {
              if (isNestType && onNestToggle) {
                onNestToggle(item.key)
                return // don't select nest parent as item
              }
              if (onSelect) onSelect(item.key)
              setSelected(item.key)
            }}
            endContent={
              isCompact || isNestType || hideEndContent
                ? null
                : (item.endContent ?? null)
            }
            startContent={
              isCompact || isNestType ? null : item.icon ? (
                <Icon
                  className={cn(
                    iconClassName || 'text-current',
                    'group-data-[selected=true]:text-current'
                  )}
                  icon={item.icon}
                  width={24}
                />
              ) : (
                (item.startContent ?? null)
              )
            }
            title={isCompact || isNestType ? null : item.title}>
            {isCompact ? (
              <Tooltip content={item.title} placement="right">
                <div className="flex w-full items-center justify-center">
                  {item.icon ? (
                    <Icon
                      className={cn(
                        iconClassName || 'text-current',
                        'group-data-[selected=true]:text-current'
                      )}
                      icon={item.icon}
                      width={24}
                    />
                  ) : (
                    (item.startContent ?? null)
                  )}
                </div>
              </Tooltip>
            ) : null}

            {!isCompact && isNestType ? (
              <Accordion
                className="p-0"
                selectedKeys={actualExpandedKeys}
                onSelectionChange={actualOnExpandedChange}
                selectionMode="multiple"
                disableAnimation
                keepContentMounted={false}>
                <AccordionItem
                  key={item.key}
                  aria-label={item.title}
                  classNames={{
                    heading: 'pr-3',
                    trigger: 'p-0',
                    content: 'py-0 pl-4'
                  }}
                  title={
                    <div className="flex h-11 w-full items-center justify-between">
                      <div className="flex items-center gap-2 px-2 py-1.5">
                        {item.icon && (
                          <Icon
                            className={cn(
                              isDarkMode ? 'text-white' : 'text-black',
                              iconClassName,
                              'group-data-[selected=true]:text-current'
                            )}
                            icon={item.icon}
                            width={24}
                          />
                        )}
                        <span
                          className={cn(
                            'text-small font-medium',
                            isDarkMode ? 'text-white' : 'text-black',
                            'group-data-[selected=true]:text-current'
                          )}>
                          {item.title}
                        </span>
                      </div>

                      {actualExpandedKeys.has(item.key) && (
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="mr-1"
                          onPress={() => {
                            const newSet = new Set(actualExpandedKeys)
                            newSet.delete(item.key)
                            actualOnExpandedChange(newSet)
                          }}>
                          <Icon icon="lucide:chevron-up" width={14} />
                        </Button>
                      )}
                    </div>
                  }>
                  {item.items && item.items.length > 0 ? (
                    <Listbox
                      className="mt-0.5"
                      classNames={{
                        list: cn('border-default-200 border-l pl-4')
                      }}
                      items={item.items}
                      variant="flat"
                      selectedKeys={[selected] as unknown as Selection}
                      selectionMode="single"
                      onSelectionChange={keys => {
                        const key = Array.from(keys)[0]
                        setSelected(key as React.Key)
                        onSelect?.(key as string)
                      }}>
                      {item.items.map(renderItem)}
                    </Listbox>
                  ) : (
                    renderItem(item)
                  )}
                </AccordionItem>
              </Accordion>
            ) : null}
          </ListboxItem>
        )
      },
      [
        isCompact,
        hideEndContent,
        iconClassName,
        selected,
        actualExpandedKeys,
        actualOnExpandedChange,
        onSelect,
        onNestToggle,
        isDarkMode
      ]
    )

    const renderItem = React.useCallback(
      (item: SidebarItem) => {
        const isNestType =
          item.items &&
          item.items.length > 0 &&
          item.type === SidebarItemType.Nest

        // Skip nest behavior for home item
        if (isNestType && item.key === 'home') {
          return (
            <ListboxItem
              {...item}
              key={item.key}
              endContent={
                isCompact || hideEndContent ? null : (item.endContent ?? null)
              }
              startContent={
                isCompact ? null : item.icon ? (
                  <Icon
                    className={cn(
                      iconClassName || 'text-current',
                      'group-data-[selected=true]:text-current'
                    )}
                    icon={item.icon}
                    width={24}
                  />
                ) : (
                  (item.startContent ?? null)
                )
              }
              textValue={item.title}
              title={isCompact ? null : item.title}>
              {isCompact ? (
                <Tooltip content={item.title} placement="right">
                  <div className="flex w-full items-center justify-center">
                    {item.icon ? (
                      <Icon
                        className={cn(
                          iconClassName || 'text-current',
                          'group-data-[selected=true]:text-current'
                        )}
                        icon={item.icon}
                        width={24}
                      />
                    ) : (
                      (item.startContent ?? null)
                    )}
                  </div>
                </Tooltip>
              ) : null}
            </ListboxItem>
          )
        }

        if (isNestType) {
          return renderNestItem(item)
        }

        return (
          <ListboxItem
            {...item}
            key={item.key}
            endContent={
              isCompact || hideEndContent ? null : (item.endContent ?? null)
            }
            startContent={
              isCompact ? null : item.icon ? (
                <Icon
                  className={cn(
                    iconClassName || 'text-current',
                    'group-data-[selected=true]:text-current'
                  )}
                  icon={item.icon}
                  width={24}
                />
              ) : (
                (item.startContent ?? null)
              )
            }
            textValue={item.title}
            title={isCompact ? null : item.title}>
            {isCompact ? (
              <Tooltip content={item.title} placement="right">
                <div className="flex w-full items-center justify-center">
                  {item.icon ? (
                    <Icon
                      className={cn(
                        iconClassName || 'text-current',
                        'group-data-[selected=true]:text-current'
                      )}
                      icon={item.icon}
                      width={24}
                    />
                  ) : (
                    (item.startContent ?? null)
                  )}
                </div>
              </Tooltip>
            ) : null}
          </ListboxItem>
        )
      },
      [isCompact, hideEndContent, iconClassName, renderNestItem]
    )

    return (
      <Listbox
        key={isCompact ? 'compact' : isVertical ? 'vertical' : 'grid'}
        ref={ref}
        hideSelectedIcon
        as="nav"
        className={cn('list-none', className)}
        classNames={{
          ...classNames,
          list: cn('items-center', classNames?.list)
        }}
        color="default"
        itemClasses={{
          ...itemClasses,
          base: getListboxItemBaseClass({ isCompact, isVertical, itemClasses }),
          title: getListboxItemTitleClass({ iconClassName, itemClasses })
        }}
        items={items}
        selectedKeys={[selected] as unknown as Selection}
        selectionMode="single"
        variant="flat"
        onSelectionChange={keys => {
          const key = Array.from(keys)[0]
          setSelected(key as React.Key)
          onSelect?.(key as string)
        }}
        {...props}>
        {item => {
          return item.items &&
            item.items.length > 0 &&
            item.type === SidebarItemType.Nest ? (
            renderNestItem(item)
          ) : item.items && item.items.length > 0 ? (
            <ListboxSection
              key={item.key}
              classNames={sectionClasses}
              showDivider={isCompact}
              title={item.title}>
              {item.items.map(renderItem)}
            </ListboxSection>
          ) : (
            renderItem(item)
          )
        }}
      </Listbox>
    )
  }
)

Sidebar.displayName = 'Sidebar'

export default Sidebar
