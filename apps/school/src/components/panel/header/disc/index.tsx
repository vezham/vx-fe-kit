// import { Icon } from '@iconify/react'
// import { useState } from 'react'
// import { forwardRef } from '@vezham/react-utils'
// import { Button, Drawer, Input, ScrollShadow, Tabs } from '@vezham/react/v3'
// import { sampleArchiveItems, sampleTrashItems } from './data'
// import { ArchiveItem, Props, TrashItem, useProps } from './types'
// const DiskDrawer = forwardRef<'div', Props>((props, ref) => {
//   const {
//     Component,
//     getDrawerDialogProps,
//     getTabsProps,
//     getTabsListContainerProps,
//     getTabsListProps,
//     getTabArchiveProps,
//     getTabTrashProps,
//     getTabIndicatorProps,
//     getContainerProps,
//     getSearchInputProps,
//     getActionsBarProps,
//     getClearAllButtonProps,
//     getRestoreAllButtonProps,
//     getEmptyContainerProps,
//     getEmptyIconProps,
//     getEmptyTitleProps,
//     getEmptyDescriptionProps,
//     getItemsContainerProps,
//     getDateGroupProps,
//     getDateHeaderProps,
//     getDateLabelProps,
//     getDateDividerProps,
//     getItemsListProps,
//     getItemProps,
//     getItemFaviconProps,
//     getItemFallbackIconProps,
//     getItemContentProps,
//     getItemTitleProps,
//     getItemUrlProps,
//     getItemActionsProps,
//     getUnarchiveButtonProps,
//     getRestoreButtonProps,
//     getDeleteButtonProps,
//     getDeletePermanentButtonProps,
//     getActionIconProps,
//     isOpen,
//     onClose,
//     placement,
//     externalArchiveItems,
//     externalTrashItems,
//     onUnarchive,
//     onDeleteFromArchive,
//     onRestore,
//     onDeletePermanently,
//     onClearAllArchive,
//     onClearAllTrash,
//     onRestoreAllTrash,
//     onItemClick,
//     renderArchiveItem,
//     renderTrashItem
//   } = useProps({
//     ...props,
//     ref
//   })
//   const [activeTab, setActiveTab] = useState<string>('archive')
//   const [archiveSearch, setArchiveSearch] = useState('')
//   const [trashSearch, setTrashSearch] = useState('')
//   const [internalArchiveItems, setInternalArchiveItems] =
//     useState<ArchiveItem[]>(sampleArchiveItems)
//   const [internalTrashItems, setInternalTrashItems] =
//     useState<TrashItem[]>(sampleTrashItems)
//   const archiveItems = externalArchiveItems || internalArchiveItems
//   const trashItems = externalTrashItems || internalTrashItems
//   const filteredArchiveItems = archiveItems.filter(
//     item =>
//       item.title.toLowerCase().includes(archiveSearch.toLowerCase()) ||
//       item.url.toLowerCase().includes(archiveSearch.toLowerCase())
//   )
//   const filteredTrashItems = trashItems.filter(
//     item =>
//       item.title.toLowerCase().includes(trashSearch.toLowerCase()) ||
//       item.url.toLowerCase().includes(trashSearch.toLowerCase())
//   )
//   const archiveByDate = filteredArchiveItems.reduce(
//     (acc, item) => {
//       const date = item.archivedDate
//       if (!acc[date]) {
//         acc[date] = []
//       }
//       acc[date].push(item)
//       return acc
//     },
//     {} as Record<string, ArchiveItem[]>
//   )
//   const trashByDate = filteredTrashItems.reduce(
//     (acc, item) => {
//       const date = item.deletedDate
//       if (!acc[date]) {
//         acc[date] = []
//       }
//       acc[date].push(item)
//       return acc
//     },
//     {} as Record<string, TrashItem[]>
//   )
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     const today = new Date()
//     const yesterday = new Date(today)
//     yesterday.setDate(yesterday.getDate() - 1)
//     if (dateString === today.toISOString().split('T')[0]) {
//       return 'Today'
//     } else if (dateString === yesterday.toISOString().split('T')[0]) {
//       return 'Yesterday'
//     } else {
//       return date.toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric'
//       })
//     }
//   }
//   const handleUnarchive = (id: string) => {
//     if (onUnarchive) {
//       onUnarchive(id)
//     } else {
//       setInternalArchiveItems(prev => prev.filter(item => item.id !== id))
//     }
//   }
//   const handleDeleteFromArchive = (id: string) => {
//     if (onDeleteFromArchive) {
//       onDeleteFromArchive(id)
//     } else {
//       setInternalArchiveItems(prev => prev.filter(item => item.id !== id))
//     }
//   }
//   const handleRestore = (id: string) => {
//     if (onRestore) {
//       onRestore(id)
//     } else {
//       setInternalTrashItems(prev => prev.filter(item => item.id !== id))
//     }
//   }
//   const handleDeletePermanently = (id: string) => {
//     if (onDeletePermanently) {
//       onDeletePermanently(id)
//     } else {
//       setInternalTrashItems(prev => prev.filter(item => item.id !== id))
//     }
//   }
//   const handleClearAllArchive = () => {
//     if (onClearAllArchive) {
//       onClearAllArchive()
//     } else {
//       setInternalArchiveItems([])
//     }
//   }
//   const handleClearAllTrash = () => {
//     if (onClearAllTrash) {
//       onClearAllTrash()
//     } else {
//       setInternalTrashItems([])
//     }
//   }
//   const handleRestoreAllTrash = () => {
//     if (onRestoreAllTrash) {
//       onRestoreAllTrash()
//     } else {
//       setInternalTrashItems([])
//     }
//   }
//   const handleItemClick = (url: string) => {
//     if (onItemClick) {
//       onItemClick(url)
//     } else if (url && url !== '#') {
//       window.open(url.startsWith('http') ? url : `https://${url}`, '_blank')
//     }
//   }
//   const hasArchiveItems = filteredArchiveItems.length > 0
//   const hasTrashItems = filteredTrashItems.length > 0
//   const renderArchiveContent = () => {
//     if (!hasArchiveItems) {
//       return (
//         <div {...getEmptyContainerProps()}>
//           <Icon {...getEmptyIconProps('solar:archive-linear')} />
//           <h2 {...getEmptyTitleProps()}>Archive is empty</h2>
//           <p {...getEmptyDescriptionProps()}>
//             Archived items will appear here.
//           </p>
//         </div>
//       )
//     }
//     return (
//       <div {...getItemsContainerProps()}>
//         {Object.entries(archiveByDate).map(([date, items]) => (
//           <div key={date} {...getDateGroupProps()}>
//             <div {...getDateHeaderProps()}>
//               <span {...getDateLabelProps()}>{formatDate(date)}</span>
//               <div {...getDateDividerProps()} />
//             </div>
//             <div {...getItemsListProps()}>
//               {items.map(item => {
//                 if (renderArchiveItem) {
//                   return renderArchiveItem({
//                     item,
//                     onAction: action => {
//                       if (action === 'unarchive') handleUnarchive(item.id)
//                       if (action === 'delete') handleDeleteFromArchive(item.id)
//                     }
//                   })
//                 }
//                 return (
//                   <div
//                     key={item.id}
//                     {...getItemProps()}
//                     onClick={() => handleItemClick(item.url)}>
//                     {item.favicon ? (
//                       <img src={item.favicon} {...getItemFaviconProps()} />
//                     ) : (
//                       <Icon {...getItemFallbackIconProps()} />
//                     )}
//                     <div {...getItemContentProps()}>
//                       <p {...getItemTitleProps(item.title)} />
//                       <p {...getItemUrlProps(item.url)} />
//                     </div>
//                     <div {...getItemActionsProps()}>
//                       <Button
//                         isIconOnly
//                         variant="ghost"
//                         {...getUnarchiveButtonProps()}
//                         onClick={e => {
//                           e.stopPropagation()
//                           handleUnarchive(item.id)
//                         }}>
//                         <Icon
//                           {...getActionIconProps(
//                             'solar:archive-up-linear',
//                             'default'
//                           )}
//                         />
//                       </Button>
//                       <Button
//                         isIconOnly
//                         variant="ghost"
//                         {...getDeleteButtonProps()}
//                         onClick={e => {
//                           e.stopPropagation()
//                           handleDeleteFromArchive(item.id)
//                         }}>
//                         <Icon
//                           {...getActionIconProps(
//                             'solar:trash-bin-trash-linear',
//                             'danger'
//                           )}
//                         />
//                       </Button>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         ))}
//       </div>
//     )
//   }
//   const renderTrashContent = () => {
//     if (!hasTrashItems) {
//       return (
//         <div {...getEmptyContainerProps()}>
//           <Icon {...getEmptyIconProps('solar:trash-bin-trash-linear')} />
//           <h2 {...getEmptyTitleProps()}>Trash is empty</h2>
//           <p {...getEmptyDescriptionProps()}>Deleted items will appear here.</p>
//         </div>
//       )
//     }
//     return (
//       <div {...getItemsContainerProps()}>
//         {Object.entries(trashByDate).map(([date, items]) => (
//           <div key={date} {...getDateGroupProps()}>
//             <div {...getDateHeaderProps()}>
//               <span {...getDateLabelProps()}>{formatDate(date)}</span>
//               <div {...getDateDividerProps()} />
//             </div>
//             <div {...getItemsListProps()}>
//               {items.map(item => {
//                 if (renderTrashItem) {
//                   return renderTrashItem({
//                     item,
//                     onAction: action => {
//                       if (action === 'restore') handleRestore(item.id)
//                       if (action === 'delete') handleDeletePermanently(item.id)
//                     }
//                   })
//                 }
//                 return (
//                   <div key={item.id} {...getItemProps()}>
//                     {item.favicon ? (
//                       <img src={item.favicon} {...getItemFaviconProps()} />
//                     ) : (
//                       <Icon {...getItemFallbackIconProps()} />
//                     )}
//                     <div {...getItemContentProps()}>
//                       <p {...getItemTitleProps(item.title)} />
//                       <p {...getItemUrlProps(item.url)} />
//                     </div>
//                     <div {...getItemActionsProps()}>
//                       <Button
//                         isIconOnly
//                         variant="ghost"
//                         {...getRestoreButtonProps()}
//                         onClick={e => {
//                           e.stopPropagation()
//                           handleRestore(item.id)
//                         }}>
//                         <Icon
//                           {...getActionIconProps(
//                             'solar:archive-up-linear',
//                             'success'
//                           )}
//                         />
//                       </Button>
//                       <Button
//                         isIconOnly
//                         variant="ghost"
//                         {...getDeletePermanentButtonProps()}
//                         onClick={e => {
//                           e.stopPropagation()
//                           handleDeletePermanently(item.id)
//                         }}>
//                         <Icon
//                           {...getActionIconProps(
//                             'solar:trash-bin-trash-linear',
//                             'danger'
//                           )}
//                         />
//                       </Button>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         ))}
//       </div>
//     )
//   }
//   return (
//     <Component>
//       <Drawer isOpen={isOpen} onOpenChange={onClose}>
//         <Drawer.Content placement={placement}>
//           <Drawer.Dialog {...getDrawerDialogProps()}>
//             <Drawer.CloseTrigger />
//             <Drawer.Header>
//               <Tabs
//                 {...getTabsProps()}
//                 selectedKey={activeTab}
//                 onSelectionChange={key => setActiveTab(key as string)}>
//                 <Tabs.ListContainer {...getTabsListContainerProps()}>
//                   <Tabs.List {...getTabsListProps()}>
//                     <Tabs.Tab {...getTabArchiveProps()}>
//                       <Icon
//                         icon="solar:archive-linear"
//                         width={18}
//                         className="mr-2"
//                       />
//                       Archive
//                       <Tabs.Indicator {...getTabIndicatorProps()} />
//                     </Tabs.Tab>
//                     <Tabs.Tab {...getTabTrashProps()}>
//                       <Icon
//                         icon="solar:trash-bin-trash-linear"
//                         width={18}
//                         className="mr-2"
//                       />
//                       Trash
//                       <Tabs.Indicator {...getTabIndicatorProps()} />
//                     </Tabs.Tab>
//                   </Tabs.List>
//                 </Tabs.ListContainer>
//               </Tabs>
// </Drawer.Header>
//             <Drawer.Body>
//               {activeTab === 'archive' && (
//                 <div {...getContainerProps()}>
//                   <Input
//                     {...getSearchInputProps(true)}
//                     value={archiveSearch}
//                     onChange={e => setArchiveSearch(e.target.value)}
//                   />
//                   {hasArchiveItems && (
//                     <div {...getActionsBarProps(false)}>
//                       <Button
//                         {...getClearAllButtonProps()}
//                         onPress={handleClearAllArchive}
//                         startContent={
//                           <Icon
//                             icon="solar:trash-bin-trash-linear"
//                             width={16}
//                           />
//                         }>
//                         Clear All
//                       </Button>
//                     </div>
//                   )}
//                   <ScrollShadow hideScrollBar className="h-full">
//                     {renderArchiveContent()}
//                   </ScrollShadow>
//                 </div>
//               )}
//               {activeTab === 'trash' && (
//                 <div {...getContainerProps()}>
//                   <Input
//                     {...getSearchInputProps(false)}
//                     value={trashSearch}
//                     onChange={e => setTrashSearch(e.target.value)}
//                   />
//                   {hasTrashItems && (
//                     <div {...getActionsBarProps(true)}>
//                       <Button
//                         {...getRestoreAllButtonProps()}
//                         onPress={handleRestoreAllTrash}
//                         startContent={
//                           <Icon icon="solar:archive-up-linear" width={16} />
//                         }>
//                         Restore All
//                       </Button>
//                       <Button
//                         {...getClearAllButtonProps()}
//                         onPress={handleClearAllTrash}
//                         startContent={
//                           <Icon
//                             icon="solar:trash-bin-trash-linear"
//                             width={16}
//                           />
//                         }>
//                         Clear All
//                       </Button>
//                     </div>
//                   )}
//                   <ScrollShadow className="h-full">
//                     {renderTrashContent()}
//                   </ScrollShadow>
//                 </div>
//               )}
//             </Drawer.Body>
//           </Drawer.Dialog>
//         </Drawer.Content>
//       </Drawer>
//     </Component>
//   )
// })
// DiskDrawer.displayName = 'DiskDrawer'
// export { DiskDrawer }
import { Icon } from '@iconify/react'
import { useState } from 'react'

import { forwardRef } from '@vezham/react-utils'
import { Button, Drawer, Input, ScrollShadow, Tabs } from '@vezham/react/v3'

import { sampleArchiveItems, sampleTrashItems } from './data'
import { ArchiveItem, Props, TrashItem, useProps } from './types'

const DiskDrawer = forwardRef<'div', Props>((props, ref) => {
  const {
    Component,
    getDrawerDialogProps,
    getTabsProps,
    getTabsListContainerProps,
    getTabsListProps,
    getTabArchiveProps,
    getTabTrashProps,
    getTabIndicatorProps,
    getContainerProps,
    getSearchInputProps,
    getActionsBarProps,
    getClearAllButtonProps,
    getRestoreAllButtonProps,
    getEmptyContainerProps,
    getEmptyIconProps,
    getEmptyTitleProps,
    getEmptyDescriptionProps,
    getItemsContainerProps,
    getDateGroupProps,
    getDateHeaderProps,
    getDateLabelProps,
    getDateDividerProps,
    getItemsListProps,
    getItemProps,
    getItemFaviconProps,
    getItemFallbackIconProps,
    getItemContentProps,
    getItemTitleProps,
    getItemUrlProps,
    getItemActionsProps,
    getUnarchiveButtonProps,
    getRestoreButtonProps,
    getDeleteButtonProps,
    getDeletePermanentButtonProps,
    getActionIconProps,
    isOpen,
    onClose,
    placement,
    externalArchiveItems,
    externalTrashItems,
    onUnarchive,
    onDeleteFromArchive,
    onRestore,
    onDeletePermanently,
    onClearAllArchive,
    onClearAllTrash,
    onRestoreAllTrash,
    onItemClick,
    renderArchiveItem,
    renderTrashItem
  } = useProps({
    ...props,
    ref
  })

  const [activeTab, setActiveTab] = useState<string>('archive')
  const [archiveSearch, setArchiveSearch] = useState('')
  const [trashSearch, setTrashSearch] = useState('')
  const [internalArchiveItems, setInternalArchiveItems] =
    useState<ArchiveItem[]>(sampleArchiveItems)
  const [internalTrashItems, setInternalTrashItems] =
    useState<TrashItem[]>(sampleTrashItems)

  const archiveItems = externalArchiveItems || internalArchiveItems
  const trashItems = externalTrashItems || internalTrashItems

  const filteredArchiveItems = archiveItems.filter(
    item =>
      item.title.toLowerCase().includes(archiveSearch.toLowerCase()) ||
      item.url.toLowerCase().includes(archiveSearch.toLowerCase())
  )

  const filteredTrashItems = trashItems.filter(
    item =>
      item.title.toLowerCase().includes(trashSearch.toLowerCase()) ||
      item.url.toLowerCase().includes(trashSearch.toLowerCase())
  )

  const archiveByDate = filteredArchiveItems.reduce(
    (acc, item) => {
      const date = item.archivedDate
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(item)
      return acc
    },
    {} as Record<string, ArchiveItem[]>
  )

  const trashByDate = filteredTrashItems.reduce(
    (acc, item) => {
      const date = item.deletedDate
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(item)
      return acc
    },
    {} as Record<string, TrashItem[]>
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (dateString === today.toISOString().split('T')[0]) {
      return 'Today'
    } else if (dateString === yesterday.toISOString().split('T')[0]) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    }
  }

  const handleUnarchive = (id: string) => {
    if (onUnarchive) {
      onUnarchive(id)
    } else {
      setInternalArchiveItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleDeleteFromArchive = (id: string) => {
    if (onDeleteFromArchive) {
      onDeleteFromArchive(id)
    } else {
      setInternalArchiveItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleRestore = (id: string) => {
    if (onRestore) {
      onRestore(id)
    } else {
      setInternalTrashItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleDeletePermanently = (id: string) => {
    if (onDeletePermanently) {
      onDeletePermanently(id)
    } else {
      setInternalTrashItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleClearAllArchive = () => {
    if (onClearAllArchive) {
      onClearAllArchive()
    } else {
      setInternalArchiveItems([])
    }
  }

  const handleClearAllTrash = () => {
    if (onClearAllTrash) {
      onClearAllTrash()
    } else {
      setInternalTrashItems([])
    }
  }

  const handleRestoreAllTrash = () => {
    if (onRestoreAllTrash) {
      onRestoreAllTrash()
    } else {
      setInternalTrashItems([])
    }
  }

  const handleItemClick = (url: string) => {
    if (onItemClick) {
      onItemClick(url)
    } else if (url && url !== '#') {
      window.open(url.startsWith('http') ? url : `https://${url}`, '_blank')
    }
  }

  const hasArchiveItems = filteredArchiveItems.length > 0
  const hasTrashItems = filteredTrashItems.length > 0

  const renderArchiveContent = () => {
    if (!hasArchiveItems) {
      return (
        <div {...getEmptyContainerProps()}>
          <Icon {...getEmptyIconProps('solar:archive-linear')} />
          <h2 {...getEmptyTitleProps()}>Archive is empty</h2>
          <p {...getEmptyDescriptionProps()}>
            Archived items will appear here.
          </p>
        </div>
      )
    }

    return (
      <div {...getItemsContainerProps()}>
        {Object.entries(archiveByDate).map(([date, items]) => (
          <div key={date} {...getDateGroupProps()}>
            <div {...getDateHeaderProps()}>
              <span {...getDateLabelProps()}>{formatDate(date)}</span>
              <div {...getDateDividerProps()} />
            </div>

            <div {...getItemsListProps()}>
              {items.map(item => {
                if (renderArchiveItem) {
                  return renderArchiveItem({
                    item,
                    onAction: action => {
                      if (action === 'unarchive') handleUnarchive(item.id)
                      if (action === 'delete') handleDeleteFromArchive(item.id)
                    }
                  })
                }

                return (
                  <div
                    key={item.id}
                    {...getItemProps()}
                    onClick={() => handleItemClick(item.url)}>
                    {item.favicon ? (
                      <img src={item.favicon} {...getItemFaviconProps()} />
                    ) : (
                      <Icon {...getItemFallbackIconProps()} />
                    )}

                    <div {...getItemContentProps()}>
                      <p {...getItemTitleProps(item.title)} />
                      <p {...getItemUrlProps(item.url)} />
                    </div>

                    <div {...getItemActionsProps()}>
                      <Button
                        isIconOnly
                        variant="ghost"
                        {...getUnarchiveButtonProps()}
                        onClick={e => {
                          e.stopPropagation()
                          handleUnarchive(item.id)
                        }}>
                        <Icon
                          {...getActionIconProps(
                            'solar:archive-up-linear',
                            'default'
                          )}
                        />
                      </Button>
                      <Button
                        isIconOnly
                        variant="ghost"
                        {...getDeleteButtonProps()}
                        onClick={e => {
                          e.stopPropagation()
                          handleDeleteFromArchive(item.id)
                        }}>
                        <Icon
                          {...getActionIconProps(
                            'solar:trash-bin-trash-linear',
                            'danger'
                          )}
                        />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderTrashContent = () => {
    if (!hasTrashItems) {
      return (
        <div {...getEmptyContainerProps()}>
          <Icon {...getEmptyIconProps('solar:trash-bin-trash-linear')} />
          <h2 {...getEmptyTitleProps()}>Trash is empty</h2>
          <p {...getEmptyDescriptionProps()}>Deleted items will appear here.</p>
        </div>
      )
    }

    return (
      <div {...getItemsContainerProps()}>
        {Object.entries(trashByDate).map(([date, items]) => (
          <div key={date} {...getDateGroupProps()}>
            <div {...getDateHeaderProps()}>
              <span {...getDateLabelProps()}>{formatDate(date)}</span>
              <div {...getDateDividerProps()} />
            </div>

            <div {...getItemsListProps()}>
              {items.map(item => {
                if (renderTrashItem) {
                  return renderTrashItem({
                    item,
                    onAction: action => {
                      if (action === 'restore') handleRestore(item.id)
                      if (action === 'delete') handleDeletePermanently(item.id)
                    }
                  })
                }

                return (
                  <div key={item.id} {...getItemProps()}>
                    {item.favicon ? (
                      <img src={item.favicon} {...getItemFaviconProps()} />
                    ) : (
                      <Icon {...getItemFallbackIconProps()} />
                    )}

                    <div {...getItemContentProps()}>
                      <p {...getItemTitleProps(item.title)} />
                      <p {...getItemUrlProps(item.url)} />
                    </div>

                    <div {...getItemActionsProps()}>
                      <Button
                        isIconOnly
                        variant="ghost"
                        {...getRestoreButtonProps()}
                        onClick={e => {
                          e.stopPropagation()
                          handleRestore(item.id)
                        }}>
                        <Icon
                          {...getActionIconProps(
                            'solar:archive-up-linear',
                            'success'
                          )}
                        />
                      </Button>
                      <Button
                        isIconOnly
                        variant="ghost"
                        {...getDeletePermanentButtonProps()}
                        onClick={e => {
                          e.stopPropagation()
                          handleDeletePermanently(item.id)
                        }}>
                        <Icon
                          {...getActionIconProps(
                            'solar:trash-bin-trash-linear',
                            'danger'
                          )}
                        />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const tabs = [
    {
      key: 'archive',
      searchValue: archiveSearch,
      setSearchValue: setArchiveSearch,
      hasItems: hasArchiveItems,
      actions: [
        {
          type: 'clear',
          props: getClearAllButtonProps(),
          onPress: handleClearAllArchive,
          icon: 'solar:trash-bin-trash-linear',
          label: 'Clear All'
        }
      ],
      renderContent: renderArchiveContent,
      getSearchProps: () => getSearchInputProps(true)
    },
    {
      key: 'trash',
      searchValue: trashSearch,
      setSearchValue: setTrashSearch,
      hasItems: hasTrashItems,
      actions: [
        {
          type: 'restore',
          props: getRestoreAllButtonProps(),
          onPress: handleRestoreAllTrash,
          icon: 'solar:archive-up-linear',
          label: 'Restore All'
        },
        {
          type: 'clear',
          props: getClearAllButtonProps(),
          onPress: handleClearAllTrash,
          icon: 'solar:trash-bin-trash-linear',
          label: 'Clear All'
        }
      ],
      renderContent: renderTrashContent,
      getSearchProps: () => getSearchInputProps(false)
    }
  ]

  const currentTab = tabs.find(tab => tab.key === activeTab)!

  return (
    <Component>
      <Drawer isOpen={isOpen} onOpenChange={onClose}>
        <Drawer.Content placement={placement}>
          <Drawer.Dialog {...getDrawerDialogProps()}>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Tabs
                variant="secondary"
                {...getTabsProps()}
                selectedKey={activeTab}
                onSelectionChange={key => setActiveTab(key as string)}>
                <Tabs.ListContainer {...getTabsListContainerProps()}>
                  <Tabs.List {...getTabsListProps()}>
                    <Tabs.Tab {...getTabArchiveProps()}>
                      <Icon
                        icon="solar:archive-linear"
                        width={18}
                        className="mr-2"
                      />
                      Archive
                      <Tabs.Indicator {...getTabIndicatorProps()} />
                    </Tabs.Tab>
                    <Tabs.Tab {...getTabTrashProps()}>
                      <Icon
                        icon="solar:trash-bin-trash-linear"
                        width={18}
                        className="mr-2"
                      />
                      Trash
                      <Tabs.Indicator {...getTabIndicatorProps()} />
                    </Tabs.Tab>
                  </Tabs.List>
                </Tabs.ListContainer>
              </Tabs>
              <Input
                {...currentTab.getSearchProps()}
                value={currentTab.searchValue}
                onChange={e => currentTab.setSearchValue(e.target.value)}
              />

              {currentTab.hasItems && currentTab.actions.length > 0 && (
                <div {...getActionsBarProps(currentTab.key === 'trash')}>
                  {currentTab.actions.map(action => (
                    <Button
                      key={action.type}
                      {...action.props}
                      onPress={action.onPress}
                      startContent={<Icon icon={action.icon} width={16} />}>
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </Drawer.Header>
            <Drawer.Body>
              <div {...getContainerProps()}>
                <ScrollShadow
                  hideScrollBar={currentTab.key === 'archive'}
                  className="h-full">
                  {currentTab.renderContent()}
                </ScrollShadow>
              </div>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>
    </Component>
  )
})

DiskDrawer.displayName = 'DiskDrawer'

export { DiskDrawer }
