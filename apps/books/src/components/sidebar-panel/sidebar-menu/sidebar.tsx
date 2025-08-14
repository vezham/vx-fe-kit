// import { Button, Listbox, ListboxItem, Tooltip } from '@heroui/react'
// import { Icon } from '@iconify/react'
// import React from 'react'
// import { SidebarItem, SidebarItemType } from './types'
// import { sidebarStyles } from './variant' // Import the styles

// export interface SidebarProps {
//   items: SidebarItem[]
//   selectedKey?: string
//   onSelect?: (key: string) => void
//   expandedKeys?: Set<string>
//   onExpandedChange?: (keys: Set<string>) => void
//   isCompact?: boolean
//   hideEndContent?: boolean
//   iconClassName?: string
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   items,
//   selectedKey,
//   onSelect,
//   expandedKeys = new Set([]),
//   onExpandedChange,
//   isCompact = false,
//   hideEndContent = false,
//   iconClassName = sidebarStyles.icon.base
// }) => {
//   const handleSelect = (key: string) => {
//     if (onSelect) onSelect(key)
//   }

//   const toggleExpand = (key: string) => {
//     const newKeys = new Set(expandedKeys)
//     if (newKeys.has(key)) {
//       newKeys.delete(key)
//     } else {
//       newKeys.add(key)
//     }
//     if (onExpandedChange) onExpandedChange(newKeys)
//   }

//   React.useEffect(() => {
//     if (isCompact && expandedKeys.size > 0) {
//       if (onExpandedChange) onExpandedChange(new Set([]))
//     }
//   }, [isCompact, expandedKeys, onExpandedChange])

//   const renderSingleItem = (item: SidebarItem) => {
//     const iconEl = (
//       <Icon
//         icon={item.icon || ''}
//         width={24}
//         className={`${iconClassName} ${
//           selectedKey === item.key ? sidebarStyles.icon.selected : ''
//         }`}
//       />
//     )

//     if (isCompact) {
//       return (
//         <div
//           key={item.key}
//           onClick={() => handleSelect(item.key)}
//           className={`${sidebarStyles.compactItem.base} ${
//             selectedKey === item.key ? sidebarStyles.compactItem.selected : ''
//           }`}>
//           <Tooltip content={item.title} placement="right">
//             {iconEl}
//           </Tooltip>
//         </div>
//       )
//     }

//     return (
//       <ListboxItem
//         key={item.key}
//         href={item.href}
//         title={item.title}
//         textValue={item.title}
//         className={`${sidebarStyles.listboxItem.base} ${
//           selectedKey === item.key ? sidebarStyles.listboxItem.selected : ''
//         }`}
//         onClick={() => handleSelect(item.key)}
//         startContent={iconEl}
//         endContent={hideEndContent ? null : item.endContent}>
//         {item.title}
//       </ListboxItem>
//     )
//   }

//   const renderNestedItem = (item: SidebarItem) => {
//     const isExpanded = expandedKeys.has(item.key)
//     const headerClasses = `${sidebarStyles.nestedItem.header.base} ${
//       selectedKey === item.key
//         ? sidebarStyles.nestedItem.header.selected
//         : sidebarStyles.nestedItem.header.unselected
//     }`

//     if (isCompact) {
//       return (
//         <div key={item.key} className="flex flex-col gap-0.5">
//           {renderSingleItem(item)}
//           {isExpanded && item.items?.map(sub => renderSingleItem(sub))}
//         </div>
//       )
//     }

//     return (
//       <div key={item.key} className={sidebarStyles.nestedItem.container}>
//         <div
//           className={headerClasses}
//           onClick={() => {
//             toggleExpand(item.key)
//             handleSelect(item.key)
//           }}>
//           <div className={sidebarStyles.flexCenterGap2}>
//             <Icon
//               icon={item.icon || ''}
//               width={24}
//               className={`${iconClassName} ${
//                 selectedKey === item.key
//                   ? sidebarStyles.icon.nestedSelected
//                   : ''
//               }`}
//             />
//             <span className={sidebarStyles.nestedItem.title}>{item.title}</span>
//           </div>
//           <Button
//             isIconOnly
//             size="sm"
//             variant="light"
//             className={sidebarStyles.button}
//             onPress={e => {
//               e.stopPropagation()
//               toggleExpand(item.key)
//             }}>
//             <Icon
//               icon={isExpanded ? 'lucide:chevron-up' : 'lucide:chevron-down'}
//               width={14}
//             />
//           </Button>
//         </div>
//         {isExpanded && (
//           <div className={sidebarStyles.nestedItem.subheader}>
//             <Listbox
//               aria-label={`${item.title} submenu`}
//               selectionMode="single"
//               selectedKeys={selectedKey ? new Set([selectedKey]) : new Set()}
//               onSelectionChange={keys => {
//                 if (keys !== 'all') {
//                   const key = Array.from(keys)[0]
//                   if (key) handleSelect(key.toString())
//                 }
//               }}
//               className={sidebarStyles.gapHalf}>
//               {item.items?.map(sub => renderSingleItem(sub))}
//             </Listbox>
//           </div>
//         )}
//       </div>
//     )
//   }

//   const sortedItems = React.useMemo(() => {
//     const home = items.find(item => item.key === 'home')
//     const bank = items.find(item => item.key === 'bank')
//     const books = items.find(item => item.key === 'books')
//     const otherItems = items.filter(
//       item => item.key !== 'home' && item.key !== 'bank' && item.key !== 'books'
//     )

//     const orderedItems = []
//     if (home) orderedItems.push(home)
//     if (bank) orderedItems.push(bank)
//     if (books) orderedItems.push(books)

//     return [...orderedItems, ...otherItems]
//   }, [items])

//   return (
//     <div className={sidebarStyles.container}>
//       {isCompact ? (
//         // Compact mode renders items as a single list of divs
//         sortedItems.map(item => {
//           if (item.type === SidebarItemType.Nest && item.items?.length) {
//             return renderNestedItem(item)
//           }
//           return renderSingleItem(item)
//         })
//       ) : (
//         // Expanded mode:
//         // Render single items in one Listbox and nested items in separate divs
//         <>
//           {sortedItems.map(item => {
//             if (item.type === SidebarItemType.Nest && item.items?.length) {
//               return renderNestedItem(item)
//             }
//             return (
//               <Listbox
//                 key={item.key} // A Listbox for each non-nested item to maintain order
//                 aria-label="Main menu"
//                 selectionMode="single"
//                 selectedKeys={selectedKey ? new Set([selectedKey]) : new Set()}
//                 onSelectionChange={keys => {
//                   if (keys !== 'all') {
//                     const key = Array.from(keys)[0]
//                     if (key) handleSelect(key.toString())
//                   }
//                 }}
//                 className={sidebarStyles.gapHalf}>
//                 {renderSingleItem(item)}
//               </Listbox>
//             )
//           })}
//         </>
//       )}
//     </div>
//   )
// }

// export default Sidebar

import { Button, Listbox, ListboxItem, Tooltip } from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'
import { useNavigate } from 'react-router-dom' // ✅ Import navigation hook
import { SidebarItem, SidebarItemType } from './types'
import { sidebarStyles } from './variant'

export interface SidebarProps {
  items: SidebarItem[]
  selectedKey?: string
  onSelect?: (key: string) => void
  expandedKeys?: Set<string>
  onExpandedChange?: (keys: Set<string>) => void
  isCompact?: boolean
  hideEndContent?: boolean
  iconClassName?: string
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  selectedKey,
  onSelect,
  expandedKeys = new Set([]),
  onExpandedChange,
  isCompact = false,
  hideEndContent = false,
  iconClassName = sidebarStyles.icon.base
}) => {
  const navigate = useNavigate() // ✅ Router navigation

  const handleSelect = (key: string, href?: string) => {
    if (onSelect) onSelect(key)
    if (href) {
      navigate(href) // ✅ Navigate on click
    }
  }

  const toggleExpand = (key: string) => {
    const newKeys = new Set(expandedKeys)
    if (newKeys.has(key)) {
      newKeys.delete(key)
    } else {
      newKeys.add(key)
    }
    if (onExpandedChange) onExpandedChange(newKeys)
  }

  React.useEffect(() => {
    if (isCompact && expandedKeys.size > 0) {
      if (onExpandedChange) onExpandedChange(new Set([]))
    }
  }, [isCompact, expandedKeys, onExpandedChange])

  const renderSingleItem = (item: SidebarItem) => {
    const iconEl = (
      <Icon
        icon={item.icon || ''}
        width={18}
        className={`${iconClassName} ${
          selectedKey === item.key ? sidebarStyles.icon.selected : ''
        }`}
      />
    )

    if (isCompact) {
      return (
        <div
          key={item.key}
          onClick={() => handleSelect(item.key, item.href)}
          className={`${sidebarStyles.compactItem.base} ${
            selectedKey === item.key ? sidebarStyles.compactItem.selected : ''
          }`}>
          <Tooltip content={item.title} placement="right">
            {iconEl}
          </Tooltip>
        </div>
      )
    }

    return (
      <ListboxItem
        key={item.key}
        title={item.title}
        textValue={item.title}
        className={`${sidebarStyles.listboxItem.base} ${
          selectedKey === item.key ? sidebarStyles.listboxItem.selected : ''
        }`}
        onClick={() => handleSelect(item.key, item.href)} // ✅ Navigate here
        startContent={iconEl}
        endContent={hideEndContent ? null : item.endContent}>
        {item.title}
      </ListboxItem>
    )
  }

  const renderNestedItem = (item: SidebarItem) => {
    const isExpanded = expandedKeys.has(item.key)
    const headerClasses = `${sidebarStyles.nestedItem.header.base} ${
      selectedKey === item.key
        ? sidebarStyles.nestedItem.header.selected
        : sidebarStyles.nestedItem.header.unselected
    }`

    if (isCompact) {
      return (
        <div key={item.key} className="flex flex-col gap-0.5">
          {renderSingleItem(item)}
          {isExpanded && item.items?.map(sub => renderSingleItem(sub))}
        </div>
      )
    }

    return (
      <div key={item.key} className={sidebarStyles.nestedItem.container}>
        <div
          className={headerClasses}
          onClick={() => {
            toggleExpand(item.key)
            handleSelect(item.key, item.href)
          }}>
          <div className={sidebarStyles.flexCenterGap2}>
            <Icon
              icon={item.icon || ''}
              width={18}
              className={`${iconClassName} ${
                selectedKey === item.key
                  ? sidebarStyles.icon.nestedSelected
                  : ''
              }`}
            />
            <span className={sidebarStyles.nestedItem.title}>{item.title}</span>
          </div>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className={sidebarStyles.button}
            onPress={e => {
              e.stopPropagation()
              toggleExpand(item.key)
            }}>
            <Icon
              icon={isExpanded ? 'lucide:chevron-up' : 'lucide:chevron-down'}
              width={10}
            />
          </Button>
        </div>
        {isExpanded && (
          <div className={sidebarStyles.nestedItem.subheader}>
            <Listbox
              aria-label={`${item.title} submenu`}
              selectionMode="single"
              selectedKeys={selectedKey ? new Set([selectedKey]) : new Set()}
              onSelectionChange={keys => {
                if (keys !== 'all') {
                  const key = Array.from(keys)[0]
                  const subItem = item.items?.find(s => s.key === key)
                  if (subItem) handleSelect(subItem.key, subItem.href) // ✅ Navigate here too
                }
              }}
              className={sidebarStyles.gapHalf}>
              {item.items?.map(sub => renderSingleItem(sub))}
            </Listbox>
          </div>
        )}
      </div>
    )
  }

  const sortedItems = React.useMemo(() => {
    const home = items.find(item => item.key === 'home')
    const bank = items.find(item => item.key === 'bank')
    const books = items.find(item => item.key === 'books')
    const otherItems = items.filter(
      item => item.key !== 'home' && item.key !== 'bank' && item.key !== 'books'
    )

    const orderedItems = []
    if (home) orderedItems.push(home)
    if (bank) orderedItems.push(bank)
    if (books) orderedItems.push(books)

    return [...orderedItems, ...otherItems]
  }, [items])

  return (
    <div className={sidebarStyles.container}>
      {isCompact ? (
        sortedItems.map(item => {
          if (item.type === SidebarItemType.Nest && item.items?.length) {
            return renderNestedItem(item)
          }
          return renderSingleItem(item)
        })
      ) : (
        <>
          {sortedItems.map(item => {
            if (item.type === SidebarItemType.Nest && item.items?.length) {
              return renderNestedItem(item)
            }
            return (
              <Listbox
                key={item.key}
                aria-label="Main menu"
                selectionMode="single"
                selectedKeys={selectedKey ? new Set([selectedKey]) : new Set()}
                onSelectionChange={keys => {
                  if (keys !== 'all') {
                    const key = Array.from(keys)[0]
                    const found = items.find(i => i.key === key)
                    if (found) handleSelect(found.key, found.href)
                  }
                }}
                className={sidebarStyles.gapHalf}>
                {renderSingleItem(item)}
              </Listbox>
            )
          })}
        </>
      )}
    </div>
  )
}

export default Sidebar
