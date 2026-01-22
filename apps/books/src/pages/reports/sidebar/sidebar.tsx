'use client'

import { Icon } from '@iconify/react'
import React from 'react'

import {
  Listbox,
  ListboxItem,
  type ListboxProps,
  ListboxSection,
  type ListboxSectionProps,
  type Selection,
  cn
} from '@vezham/react/v2'

export type SidebarItem = {
  key: string
  title: string
  icon?: string
  href?: string
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  items?: SidebarItem[]
  className?: string
}

export type SidebarProps = Omit<ListboxProps<SidebarItem>, 'children'> & {
  items: SidebarItem[]
  hideEndContent?: boolean
  iconClassName?: string
  sectionClasses?: ListboxSectionProps['classNames']
  classNames?: ListboxProps['classNames']
  defaultSelectedKey?: string
  selectedKey?: string
  onSelect?: (key: string) => void
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      items,
      defaultSelectedKey,
      selectedKey,
      onSelect,
      hideEndContent,
      sectionClasses: sectionClassesProp = {},
      itemClasses: itemClassesProp = {},
      iconClassName,
      classNames,
      className,
      ...props
    },
    ref
  ) => {
    const [selected, setSelected] = React.useState<React.Key>(
      selectedKey ?? defaultSelectedKey ?? ''
    )

    React.useEffect(() => {
      if (selectedKey !== undefined && selectedKey !== selected) {
        setSelected(selectedKey)
      }
    }, [selected, selectedKey])

    const sectionClasses = {
      ...sectionClassesProp,
      base: cn(sectionClassesProp?.base, 'w-full'),
      group: cn(sectionClassesProp?.group),
      heading: cn(sectionClassesProp?.heading)
    }

    const itemClasses = {
      ...itemClassesProp
    }

    // Render a single item
    const renderItem = (item: SidebarItem) => (
      <ListboxItem
        key={item.key}
        classNames={{
          base: cn('rounded-large m-1 pb-2')
        }}
        endContent={hideEndContent ? null : (item.endContent ?? null)}
        startContent={
          item.icon ? (
            <Icon
              className={cn(
                'text-default-500 group-data-[selected=true]:text-foreground',
                iconClassName
              )}
              icon={item.icon}
              width={24}
            />
          ) : (
            (item.startContent ?? null)
          )
        }
        textValue={item.title}
        title={item.title}
      />
    )

    return (
      <Listbox
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
          base: cn(
            'rounded-large data-[selected=true]:bg-default-100',
            itemClasses?.base
          ),
          title: cn(
            'text-small text-default-500 group-data-[selected=true]:text-foreground font-medium',
            itemClasses?.title
          )
        }}
        items={items}
        selectedKeys={[selected] as unknown as Selection}
        selectionMode="single"
        variant="flat"
        onSelectionChange={keys => {
          const key = Array.from(keys)[0]
          if (!key) return
          setSelected(key as React.Key)
          onSelect?.(key as string)
        }}
        {...props}>
        {(item: SidebarItem) => {
          // If item has nested items, render them all in the same section
          if (item.items && item.items.length > 0) {
            return (
              <ListboxSection
                key={item.key}
                classNames={sectionClasses}
                title={item.title}>
                {item.items.flatMap(subItem => {
                  // If subItem has nested items, include them in the flat list
                  if (subItem.items && subItem.items.length > 0) {
                    return [
                      // Render the parent item (Sales, Purchase, Inventory)
                      <ListboxItem
                        key={subItem.key}
                        classNames={{
                          base: cn('rounded-large m-1 pb-2 font-semibold')
                        }}
                        startContent={
                          subItem.icon ? (
                            <Icon
                              className={cn(
                                'text-default-500 group-data-[selected=true]:text-foreground',
                                iconClassName
                              )}
                              icon={subItem.icon}
                              width={24}
                            />
                          ) : null
                        }
                        // textValue={subItem.title}
                        title={subItem.title}
                      />,
                      // Render all nested items with indentation
                      ...subItem.items.map(nestedItem => (
                        <ListboxItem
                          key={nestedItem.key}
                          classNames={{
                            base: cn('rounded-large mt-1 ml-5 px-3')
                          }}
                          startContent={
                            <Icon
                              className="text-default-500 group-data-[selected=true]:text-foreground"
                              icon={nestedItem.icon}></Icon>
                          }
                          textValue={nestedItem.title}
                          title={nestedItem.title}
                        />
                      ))
                    ]
                  }
                  // Regular item without nested items
                  return renderItem(subItem)
                })}
              </ListboxSection>
            )
          } else {
            return renderItem(item)
          }
        }}
      </Listbox>
    )
  }
)

Sidebar.displayName = 'Sidebar'
export default Sidebar
