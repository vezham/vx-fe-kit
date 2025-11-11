// // layouts/reports/Sidebar.tsx
// 'use client'

// import {
//   Accordion,
//   AccordionItem,
//   cn,
//   Listbox,
//   ListboxItem,
//   ListboxSection,
//   Tooltip,
//   type ListboxProps,
//   type ListboxSectionProps,
//   type Selection
// } from '@heroui/react'
// import { Icon } from '@iconify/react'
// import React from 'react'

// export enum SidebarItemType {
//   Nest = 'nest'
// }

// export type SidebarItem = {
//   key: string
//   title: string
//   icon?: string
//   href?: string
//   type?: SidebarItemType.Nest
//   startContent?: React.ReactNode
//   endContent?: React.ReactNode
//   items?: SidebarItem[]
//   className?: string
// }

// export type SidebarProps = Omit<ListboxProps<SidebarItem>, 'children'> & {
//   items: SidebarItem[]
//   isCompact?: boolean
//   hideEndContent?: boolean
//   iconClassName?: string
//   sectionClasses?: ListboxSectionProps['classNames']
//   classNames?: ListboxProps['classNames']
//   defaultSelectedKey?: string
//   selectedKey?: string // controlled selected key
//   onSelect?: (key: string) => void
// }

// const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
//   (
//     {
//       items,
//       isCompact,
//       defaultSelectedKey,
//       selectedKey,
//       onSelect,
//       hideEndContent,
//       sectionClasses: sectionClassesProp = {},
//       itemClasses: itemClassesProp = {},
//       iconClassName,
//       classNames,
//       className,
//       ...props
//     },
//     ref
//   ) => {
//     // controlled if selectedKey provided, otherwise internal state
//     const [selected, setSelected] = React.useState<React.Key>(
//       selectedKey ?? defaultSelectedKey ?? ''
//     )

//     React.useEffect(() => {
//       if (selectedKey !== undefined && selectedKey !== selected) {
//         setSelected(selectedKey)
//       }
//     }, [selected, selectedKey])

//     const sectionClasses = {
//       ...sectionClassesProp,
//       base: cn(sectionClassesProp?.base, 'w-full', {
//         'max-w-[44px] p-0': isCompact
//       }),
//       group: cn(sectionClassesProp?.group, {
//         'flex flex-col gap-1': isCompact
//       }),
//       heading: cn(sectionClassesProp?.heading, {
//         hidden: isCompact
//       })
//     }

//     const itemClasses = {
//       ...itemClassesProp,
//       base: cn(itemClassesProp?.base, {
//         'h-11 w-11 gap-0 p-0': isCompact
//       })
//     }

//     // Render a non-nested item
//     const renderItem = React.useCallback(
//       (item: SidebarItem) => {
//         const isNestType =
//           item.items &&
//           item.items.length > 0 &&
//           item.type === SidebarItemType.Nest

//         if (isNestType) {
//           // Handled by renderNestItem
//           return null
//         }

//         return (
//           <ListboxItem
//             key={item.key}
//             classNames={{
//               base: cn('rounded-large px-3')
//             }}
//             endContent={
//               isCompact || hideEndContent ? null : (item.endContent ?? null)
//             }
//             startContent={
//               isCompact ? null : item.icon ? (
//                 <Icon
//                   className={cn(
//                     'text-default-500 group-data-[selected=true]:text-foreground',
//                     iconClassName
//                   )}
//                   icon={item.icon}
//                   width={24}
//                 />
//               ) : (
//                 (item.startContent ?? null)
//               )
//             }
//             textValue={item.title}
//             title={isCompact ? null : item.title}>
//             {isCompact ? (
//               <Tooltip content={item.title} placement="right">
//                 <div className="flex w-full items-center justify-center">
//                   {item.icon ? (
//                     <Icon
//                       className={cn(
//                         'text-default-500 group-data-[selected=true]:text-foreground',
//                         iconClassName
//                       )}
//                       icon={item.icon}
//                       width={24}
//                     />
//                   ) : (
//                     (item.startContent ?? null)
//                   )}
//                 </div>
//               </Tooltip>
//             ) : null}
//           </ListboxItem>
//         )
//       },
//       [isCompact, hideEndContent, iconClassName]
//     )

//     // Render nested item (accordion with sub-list)
//     const renderNestItem = React.useCallback(
//       (item: SidebarItem) => {
//         const isNestType =
//           item.items &&
//           item.items.length > 0 &&
//           item.type === SidebarItemType.Nest

//         return (
//           <ListboxItem
//             key={item.key}
//             classNames={{
//               base: cn({
//                 'h-auto p-0': !isCompact && isNestType
//               })
//             }}
//             endContent={
//               isCompact || isNestType || hideEndContent
//                 ? null
//                 : (item.endContent ?? null)
//             }
//             startContent={
//               isCompact || isNestType ? null : item.icon ? (
//                 <Icon
//                   className={cn(
//                     'text-default-500 group-data-[selected=true]:text-foreground',
//                     iconClassName
//                   )}
//                   icon={item.icon}
//                   width={24}
//                 />
//               ) : (
//                 (item.startContent ?? null)
//               )
//             }
//             title={isCompact || isNestType ? null : item.title}>
//             {isCompact ? (
//               <Tooltip content={item.title} placement="right">
//                 <div className="flex w-full items-center justify-center">
//                   {item.icon ? (
//                     <Icon
//                       className={cn(
//                         'text-default-500 group-data-[selected=true]:text-foreground',
//                         iconClassName
//                       )}
//                       icon={item.icon}
//                       width={24}
//                     />
//                   ) : (
//                     (item.startContent ?? null)
//                   )}
//                 </div>
//               </Tooltip>
//             ) : null}

//             {!isCompact && isNestType ? (
//               <Accordion className={'p-0'}>
//                 <AccordionItem
//                   key={item.key}
//                   aria-label={item.title}
//                   classNames={{
//                     heading: 'pr-3',
//                     trigger: 'p-0',
//                     content: 'py-0 pl-4'
//                   }}
//                   title={
//                     item.icon ? (
//                       <div
//                         className={'flex h-11 items-center gap-2 px-2 py-1.5'}>
//                         <Icon
//                           className={cn(
//                             'text-default-500 group-data-[selected=true]:text-foreground',
//                             iconClassName
//                           )}
//                           icon={item.icon}
//                           width={24}
//                         />
//                         <span className="text-small text-default-500 group-data-[selected=true]:text-foreground font-medium">
//                           {item.title}
//                         </span>
//                       </div>
//                     ) : (
//                       (item.startContent ?? null)
//                     )
//                   }>
//                   {item.items && item.items.length > 0 ? (
//                     // inner Listbox: make sure to bubble selection up
//                     <Listbox
//                       className={'mt-0.5'}
//                       classNames={{
//                         list: cn('border-default-200 border-l pl-4')
//                       }}
//                       items={item.items}
//                       variant="flat"
//                       onSelectionChange={keys => {
//                         const key = Array.from(keys)[0]
//                         if (!key) return
//                         setSelected(key as React.Key)
//                         onSelect?.(key as string)
//                       }}>
//                       {item.items.map(sub => renderInnerItem(sub))}
//                     </Listbox>
//                   ) : null}
//                 </AccordionItem>
//               </Accordion>
//             ) : null}
//           </ListboxItem>
//         )
//       },
//       [isCompact, hideEndContent, iconClassName, onSelect]
//     )

//     // inner render used by nested list so we can add keys properly
//     const renderInnerItem = React.useCallback(
//       (item: SidebarItem) => {
//         return (
//           <ListboxItem
//             key={item.key}
//             endContent={
//               isCompact || hideEndContent ? null : (item.endContent ?? null)
//             }
//             startContent={
//               isCompact ? null : item.icon ? (
//                 <Icon
//                   className={cn(
//                     'text-default-500 group-data-[selected=true]:text-foreground',
//                     iconClassName
//                   )}
//                   icon={item.icon}
//                   width={24}
//                 />
//               ) : (
//                 (item.startContent ?? null)
//               )
//             }
//             textValue={item.title}
//             title={isCompact ? null : item.title}>
//             {isCompact ? (
//               <Tooltip content={item.title} placement="right">
//                 <div className="flex w-full items-center justify-center">
//                   {item.icon ? (
//                     <Icon
//                       className={cn(
//                         'text-default-500 group-data-[selected=true]:text-foreground',
//                         iconClassName
//                       )}
//                       icon={item.icon}
//                       width={24}
//                     />
//                   ) : (
//                     (item.startContent ?? null)
//                   )}
//                 </div>
//               </Tooltip>
//             ) : null}
//           </ListboxItem>
//         )
//       },
//       [isCompact, hideEndContent, iconClassName]
//     )

//     return (
//       <Listbox
//         key={isCompact ? 'compact' : 'default'}
//         ref={ref}
//         hideSelectedIcon
//         as="nav"
//         className={cn('list-none', className)}
//         classNames={{
//           ...classNames,
//           list: cn('items-center', classNames?.list)
//         }}
//         color="default"
//         itemClasses={{
//           ...itemClasses,
//           base: cn(
//             'rounded-large data-[selected=true]:bg-default-100 px-3',
//             itemClasses?.base
//           ),
//           title: cn(
//             'text-small text-default-500 group-data-[selected=true]:text-foreground font-medium',
//             itemClasses?.title
//           )
//         }}
//         items={items}
//         selectedKeys={[selected] as unknown as Selection}
//         selectionMode="single"
//         variant="flat"
//         onSelectionChange={keys => {
//           const key = Array.from(keys)[0]
//           if (!key) return
//           setSelected(key as React.Key)
//           onSelect?.(key as string)
//         }}
//         {...props}>
//         {item =>
//           item.items &&
//           item.items.length > 0 &&
//           item.type === SidebarItemType.Nest ? (
//             renderNestItem(item)
//           ) : item.items && item.items.length > 0 ? (
//             <ListboxSection
//               key={item.key}
//               classNames={sectionClasses}
//               showDivider={isCompact}
//               title={item.title}>
//               {item.items.map(sub => (
//                 <React.Fragment key={sub.key}>
//                   {renderItem(sub) ?? renderItem(sub)}
//                 </React.Fragment>
//               ))}
//             </ListboxSection>
//           ) : (
//             renderItem(item)
//           )
//         }
//       </Listbox>
//     )
//   }
// )

// Sidebar.displayName = 'Sidebar'
// export default Sidebar

// layouts/reports/Sidebar.tsx

'use client'

import {
  cn,
  Listbox,
  ListboxItem,
  ListboxSection,
  type ListboxProps,
  type ListboxSectionProps,
  type Selection
} from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'

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
