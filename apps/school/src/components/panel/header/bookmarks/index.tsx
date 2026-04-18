// 'use client'
// import { Icon } from '@iconify/react'
// import { useState } from 'react'
// import React from 'react'
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragEndEvent,
//   DragStartEvent,
//   DragOverlay,
//   defaultDropAnimationSideEffects,
// } from '@dnd-kit/core'
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   rectSortingStrategy,
//   verticalListSortingStrategy,
//   horizontalListSortingStrategy,
// } from '@dnd-kit/sortable'
// import { forwardRef } from '@vezham/react-utils'
// import {
//   Accordion,
//   Avatar,
//   Button,
//   Drawer,
//   Input,
//   ScrollShadow
// } from '@vezham/react/v3'
// import { sampleBookmarks, sampleFavorites } from './data'
// import { BookmarkItem, FavoriteItem, Props, useProps } from './types'
// import { SortableFavoriteItem } from './SortableFavoriteItem'
// import { SortableBookmarkItem } from './SortableBookMarksItem'
// import { SortableFolderItem } from './SortableFolderItem'
// const BookmarksDrawer = forwardRef<'div', Props>((props, ref) => {
//   const {
//     Component,
//     getDrawerDialogProps,
//     getDrawerBodyProps,
//     getSearchContainerProps,
//     getSearchInputProps,
//     getScrollShadowProps,
//     getEmptyContainerProps,
//     getEmptyIconProps,
//     getEmptyTitleProps,
//     getEmptyDescriptionProps,
//     getContentContainerProps,
//     getSectionProps,
//     getSectionHeaderProps,
//     getSectionIconProps,
//     getSectionTitleProps,
//     getFavoritesGridProps,
//     getFavorites2GridProps,
//     getFavoriteItemProps,
//     getFavorite2ItemsProps,
//     getFavoriteBackgroundImageProps,
//     getFavoriteBackgroundGradientProps,
//     getFavoriteOverlayProps,
//     getFavoriteAvatarContainerProps,
//     getFavoriteAvatarProps,
//     getFavoriteAvatarIconProps,
//     getFavoriteAvatarFallbackProps,
//     getFavoriteContentProps,
//     getFavoriteNameProps,
//     getBookmarksListProps,
//     getBookmarkItemProps,
//     getBookmarkAvatarProps,
//     getBookmarkAvatarFallbackProps,
//     getBookmarkContentProps,
//     getBookmarkNameProps,
//     getBookmarkUrlProps,
//     getBookmarkDeleteButtonProps,
//     getFolderAccordionProps,
//     getFolderItemProps,
//     getFolderHeadingProps,
//     getFolderTriggerProps,
//     getFolderTriggerContentProps,
//     getFolderIconProps,
//     getFolderNameProps,
//     getFolderCountProps,
//     getFolderIndicatorProps,
//     getFolderPanelProps,
//     getFolderBodyProps,
//     isOpen,
//     onClose,
//     placement,
//     externalFavorites,
//     externalBookmarks,
//     onFavoriteClick,
//     onBookmarkClick,
//     onBookmarkDelete,
//     renderFavoriteItem,
//     renderBookmarkItem,
//     renderFolderItem,
//     onFavoritesReorder,
//     onBookmarksReorder,
//     onFolderReorder
//   } = useProps({
//     ...props,
//     ref
//   })
//   const [searchQuery, setSearchQuery] = useState('')
//   const [internalFavorites, setInternalFavorites] =
//     useState<FavoriteItem[]>(sampleFavorites)
//   const [internalBookmarks, setInternalBookmarks] =
//     useState<BookmarkItem[]>(sampleBookmarks)
//   const [hoveredBookmarkId, setHoveredBookmarkId] = useState<string | null>(
//     null
//   )
//   const [activeId, setActiveId] = useState<string | null>(null)
//   const [activeType, setActiveType] = useState<'favorite' | 'bookmark' | 'folder' | null>(null)
//   const favorites = externalFavorites || internalFavorites
//   const bookmarks = externalBookmarks || internalBookmarks
//   // Sensors for drag and drop
//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 8,
//       },
//     }),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   )
//   const filteredFavorites = favorites.filter(item =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   )
//   const filteredBookmarks = bookmarks.filter(item =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   )
//   const folderBookmarks = filteredBookmarks.filter(b => b.folder)
//   const singleBookmarks = filteredBookmarks.filter(b => !b.folder)
//   const bookmarksByFolder = folderBookmarks.reduce(
//     (acc, bookmark) => {
//       const folder = bookmark.folder!
//       if (!acc[folder]) {
//         acc[folder] = []
//       }
//       acc[folder].push(bookmark)
//       return acc
//     },
//     {} as Record<string, BookmarkItem[]>
//   )
//   const folderNames = Object.keys(bookmarksByFolder).sort()
//   const hasFavorites = filteredFavorites.length > 0
//   const hasFolderBookmarks = folderNames.length > 0
//   const hasSingleBookmarks = singleBookmarks.length > 0
//   const hasBookmarks = hasFolderBookmarks || hasSingleBookmarks
//   // Drag and drop handlers
//   const handleDragStart = (event: DragStartEvent) => {
//     const { active } = event
//     setActiveId(active.id as string)
//     // Determine the type of item being dragged
//     if (filteredFavorites.some(f => f.id === active.id)) {
//       setActiveType('favorite')
//     } else if (singleBookmarks.some(b => b.id === active.id)) {
//       setActiveType('bookmark')
//     } else if (folderNames.includes(active.id as string)) {
//       setActiveType('folder')
//     }
//   }
//   const handleFavoriteDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event
//     setActiveId(null)
//     setActiveType(null)
//     if (active.id !== over?.id) {
//       const oldIndex = filteredFavorites.findIndex((item) => item.id === active.id)
//       const newIndex = filteredFavorites.findIndex((item) => item.id === over?.id)
//       if (oldIndex !== -1 && newIndex !== -1) {
//         const newFavorites = arrayMove(filteredFavorites, oldIndex, newIndex)
//         if (!externalFavorites) {
//           setInternalFavorites(newFavorites)
//         } else if (onFavoritesReorder) {
//           onFavoritesReorder(newFavorites)
//         }
//       }
//     }
//   }
//   const handleBookmarkDragEnd = (event: DragEndEvent, bookmarkList: BookmarkItem[], isSingleBookmark: boolean = true) => {
//     const { active, over } = event
//     setActiveId(null)
//     setActiveType(null)
//     if (active.id !== over?.id) {
//       const oldIndex = bookmarkList.findIndex((item) => item.id === active.id)
//       const newIndex = bookmarkList.findIndex((item) => item.id === over?.id)
//       if (oldIndex !== -1 && newIndex !== -1) {
//         const newBookmarkList = arrayMove(bookmarkList, oldIndex, newIndex)
//         if (isSingleBookmark) {
//           // Update single bookmarks while preserving folder bookmarks
//           const otherBookmarks = bookmarks.filter(b => b.folder)
//           const finalBookmarks = [...newBookmarkList, ...otherBookmarks]
//           if (!externalBookmarks) {
//             setInternalBookmarks(finalBookmarks)
//           } else if (onBookmarksReorder) {
//             onBookmarksReorder(finalBookmarks)
//           }
//         } else {
//           // Update folder bookmarks
//           const otherBookmarks = bookmarks.filter(b => !b.folder)
//           const finalBookmarks = [...otherBookmarks, ...newBookmarkList]
//           if (!externalBookmarks) {
//             setInternalBookmarks(finalBookmarks)
//           } else if (onBookmarksReorder) {
//             onBookmarksReorder(finalBookmarks)
//           }
//         }
//       }
//     }
//   }
//   const handleFolderDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event
//     setActiveId(null)
//     setActiveType(null)
//     if (active.id !== over?.id) {
//       const oldIndex = folderNames.findIndex((folder) => folder === active.id)
//       const newIndex = folderNames.findIndex((folder) => folder === over?.id)
//       if (oldIndex !== -1 && newIndex !== -1) {
//         const newFolderNames = arrayMove(folderNames, oldIndex, newIndex)
//         // Reorganize bookmarks based on new folder order
//         const newBookmarks: BookmarkItem[] = []
//         // Add single bookmarks first
//         newBookmarks.push(...singleBookmarks)
//         // Add folder bookmarks in new order
//         newFolderNames.forEach(folder => {
//           newBookmarks.push(...bookmarksByFolder[folder])
//         })
//         if (!externalBookmarks) {
//           setInternalBookmarks(newBookmarks)
//         } else if (onFolderReorder) {
//           onFolderReorder(newBookmarks)
//         }
//       }
//     }
//   }
//   const handleItemClick = (url: string, item?: FavoriteItem | BookmarkItem) => {
//     if (url && url !== '#') {
//       window.open(url.startsWith('http') ? url : `https://${url}`, '_blank')
//     }
//   }
//   const handleFavoriteClick = (url: string, item: FavoriteItem) => {
//     if (onFavoriteClick) {
//       onFavoriteClick(url, item)
//     } else {
//       handleItemClick(url, item)
//     }
//   }
//   const handleBookmarkClick = (url: string, item: BookmarkItem) => {
//     if (onBookmarkClick) {
//       onBookmarkClick(url, item)
//     } else {
//       handleItemClick(url, item)
//     }
//   }
//   const handleBookmarkDelete = (item: BookmarkItem, e: React.MouseEvent) => {
//     e.stopPropagation()
//     if (onBookmarkDelete) {
//       onBookmarkDelete(item.id, item)
//     } else {
//       setInternalBookmarks(prev => prev.filter(b => b.id !== item.id))
//     }
//   }
//   const renderFavoriteItemsForGrid1 = () => {
//     if (renderFavoriteItem) {
//       return filteredFavorites.map(item => (
//         <React.Fragment key={item.id}>
//           {renderFavoriteItem({
//             item,
//             onItemClick: url => handleFavoriteClick(url, item)
//           })}
//         </React.Fragment>
//       ))
//     }
//     return (
//       <SortableContext items={filteredFavorites.map(f => f.id)} strategy={rectSortingStrategy}>
//         {filteredFavorites.map(item => (
//           <SortableFavoriteItem
//             key={item.id}
//             id={item.id}
//             item={item}
//             getFavoriteItemProps={getFavoriteItemProps}
//             getFavoriteBackgroundImageProps={getFavoriteBackgroundImageProps}
//             getFavoriteBackgroundGradientProps={getFavoriteBackgroundGradientProps}
//             getFavoriteOverlayProps={getFavoriteOverlayProps}
//             getFavoriteAvatarContainerProps={getFavoriteAvatarContainerProps}
//             getFavoriteAvatarProps={getFavoriteAvatarProps}
//             getFavoriteAvatarIconProps={getFavoriteAvatarIconProps}
//             getFavoriteAvatarFallbackProps={getFavoriteAvatarFallbackProps}
//             getFavoriteContentProps={getFavoriteContentProps}
//             getFavoriteNameProps={getFavoriteNameProps}
//             onClick={() => handleFavoriteClick(item.url, item)}
//           />
//         ))}
//       </SortableContext>
//     )
//   }
//   const renderFavoriteItemsForGrid2 = () => {
//     if (renderFavoriteItem) {
//       return filteredFavorites.map(item => (
//         <React.Fragment key={item.id}>
//           {renderFavoriteItem({
//             item,
//             onItemClick: url => handleFavoriteClick(url, item)
//           })}
//         </React.Fragment>
//       ))
//     }
//     return (
//       <SortableContext items={filteredFavorites.map(f => f.id)} strategy={horizontalListSortingStrategy}>
//         {filteredFavorites.map(item => (
//           <SortableFavoriteItem
//             key={item.id}
//             id={item.id}
//             item={item}
//             getFavoriteItemProps={getFavorite2ItemsProps}
//             getFavoriteBackgroundImageProps={getFavoriteBackgroundImageProps}
//             getFavoriteBackgroundGradientProps={getFavoriteBackgroundGradientProps}
//             getFavoriteOverlayProps={getFavoriteOverlayProps}
//             getFavoriteAvatarContainerProps={getFavoriteAvatarContainerProps}
//             getFavoriteAvatarProps={getFavoriteAvatarProps}
//             getFavoriteAvatarIconProps={getFavoriteAvatarIconProps}
//             getFavoriteAvatarFallbackProps={getFavoriteAvatarFallbackProps}
//             getFavoriteContentProps={getFavoriteContentProps}
//             getFavoriteNameProps={getFavoriteNameProps}
//             onClick={() => handleFavoriteClick(item.url, item)}
//           />
//         ))}
//       </SortableContext>
//     )
//   }
//   const renderBookmarkItems = (items: BookmarkItem[], isFolderContent: boolean = false) => {
//     if (renderBookmarkItem) {
//       return items.map(item => (
//         <React.Fragment key={item.id}>
//           {renderBookmarkItem({
//             item,
//             onItemClick: url => handleBookmarkClick(url, item)
//           })}
//         </React.Fragment>
//       ))
//     }
//     return (
//       <SortableContext items={items.map(b => b.id)} strategy={verticalListSortingStrategy}>
//         {items.map(bookmark => (
//           <SortableBookmarkItem
//             key={bookmark.id}
//             id={bookmark.id}
//             item={bookmark}
//             getBookmarkItemProps={getBookmarkItemProps}
//             getBookmarkAvatarProps={getBookmarkAvatarProps}
//             getBookmarkAvatarFallbackProps={getBookmarkAvatarFallbackProps}
//             getBookmarkContentProps={getBookmarkContentProps}
//             getBookmarkNameProps={getBookmarkNameProps}
//             getBookmarkUrlProps={getBookmarkUrlProps}
//             getBookmarkDeleteButtonProps={getBookmarkDeleteButtonProps}
//             onClick={() => handleBookmarkClick(bookmark.url, bookmark)}
//             onDelete={(e) => handleBookmarkDelete(bookmark, e)}
//             isHovered={hoveredBookmarkId === bookmark.id}
//             onMouseEnter={() => setHoveredBookmarkId(bookmark.id)}
//             onMouseLeave={() => setHoveredBookmarkId(null)}
//           />
//         ))}
//       </SortableContext>
//     )
//   }
//   const renderFolderBookmarks = () => {
//     if (renderFolderItem) {
//       return folderNames.map(folder => (
//         <React.Fragment key={folder}>
//           {renderFolderItem(folder, bookmarksByFolder[folder], url =>
//             handleBookmarkClick(url, bookmarksByFolder[folder][0])
//           )}
//         </React.Fragment>
//       ))
//     }
//     return (
//       <SortableContext items={folderNames} strategy={verticalListSortingStrategy}>
//         {folderNames.map(folder => (
//           <SortableFolderItem
//             key={folder}
//             id={folder}
//             folder={folder}
//             items={bookmarksByFolder[folder]}
//             getFolderAccordionProps={getFolderAccordionProps}
//             getFolderItemProps={getFolderItemProps}
//             getFolderHeadingProps={getFolderHeadingProps}
//             getFolderTriggerProps={getFolderTriggerProps}
//             getFolderTriggerContentProps={getFolderTriggerContentProps}
//             getFolderIconProps={getFolderIconProps}
//             getFolderNameProps={getFolderNameProps}
//             getFolderCountProps={getFolderCountProps}
//             getFolderIndicatorProps={getFolderIndicatorProps}
//             getFolderPanelProps={getFolderPanelProps}
//             getFolderBodyProps={getFolderBodyProps}
//             renderBookmarkItems={renderBookmarkItems}
//           />
//         ))}
//       </SortableContext>
//     )
//   }
//   const getDragEndHandler = () => {
//     return (event: DragEndEvent) => {
//       const { active } = event
//       if (activeType === 'favorite') {
//         handleFavoriteDragEnd(event)
//       } else if (activeType === 'bookmark') {
//         handleBookmarkDragEnd(event, singleBookmarks, true)
//       } else if (activeType === 'folder') {
//         handleFolderDragEnd(event)
//       }
//       setActiveId(null)
//       setActiveType(null)
//     }
//   }
//   const activeFavorite = activeId && activeType === 'favorite' ? filteredFavorites.find(f => f.id === activeId) : null
//   const activeBookmark = activeId && activeType === 'bookmark' ? singleBookmarks.find(b => b.id === activeId) : null
//   const activeFolder = activeId && activeType === 'folder' ? folderNames.find(f => f === activeId) : null
//   return (
//     <Component>
//       <Drawer isOpen={isOpen} onOpenChange={onClose}>
//         <Drawer.Content placement={placement}>
//           <Drawer.Dialog {...getDrawerDialogProps()}>
//             <Drawer.CloseTrigger />
//             <Drawer.Header>
//               <div {...getSearchContainerProps()}>
//                 <Input
//                   {...getSearchInputProps()}
//                   value={searchQuery}
//                   onChange={e => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </Drawer.Header>
//             <Drawer.Body {...getDrawerBodyProps()}>
//               <ScrollShadow {...getScrollShadowProps()}>
//                 <DndContext
//                   sensors={sensors}
//                   collisionDetection={closestCenter}
//                   onDragStart={handleDragStart}
//                   onDragEnd={getDragEndHandler()}
//                 >
//                   {!hasFavorites && !hasBookmarks ? (
//                     <div {...getEmptyContainerProps()}>
//                       <Icon {...getEmptyIconProps()} />
//                       <h2 {...getEmptyTitleProps()} />
//                       <p {...getEmptyDescriptionProps()} />
//                     </div>
//                   ) : (
//                     <div {...getContentContainerProps()}>
//                       {hasFavorites && (
//                         <>
//                           {/* Grid 1: Flex Wrap (Multiple Rows) */}
//                           <section {...getSectionProps()}>
//                             <div {...getSectionHeaderProps()}>
//                               <Icon
//                                 {...getSectionIconProps(
//                                   'solar:star-bold',
//                                   'text-warning'
//                                 )}
//                               />
//                               <h3 {...getSectionTitleProps('Favorites (Grid)')} />
//                               <span className="ml-auto text-xs text-default-400">Drag to reorder</span>
//                             </div>
//                             <div {...getFavoritesGridProps()}>
//                               {renderFavoriteItemsForGrid1()}
//                             </div>
//                           </section>
//                           {/* Grid 2: Horizontal Scroll (Single Row) */}
//                           <section {...getSectionProps()}>
//                             <div {...getSectionHeaderProps()}>
//                               <Icon
//                                 {...getSectionIconProps(
//                                   'solar:star-bold',
//                                   'text-warning'
//                                 )}
//                               />
//                               <h3
//                                 {...getSectionTitleProps('Favorites (Scroll)')}
//                               />
//                               <span className="ml-auto text-xs text-default-400">Drag to reorder</span>
//                             </div>
//                             <div {...getFavorites2GridProps()}>
//                               {renderFavoriteItemsForGrid2()}
//                             </div>
//                           </section>
//                         </>
//                       )}
//                       {hasSingleBookmarks && (
//                         <section {...getSectionProps()}>
//                           <div {...getSectionHeaderProps()}>
//                             <Icon
//                               {...getSectionIconProps(
//                                 'solar:bookmark-bold',
//                                 'text-primary'
//                               )}
//                             />
//                             <h3 {...getSectionTitleProps('Bookmarks')} />
//                             <span className="ml-auto text-xs text-default-400">Drag to reorder</span>
//                           </div>
//                           <div {...getBookmarksListProps()}>
//                             {renderBookmarkItems(singleBookmarks, false)}
//                           </div>
//                         </section>
//                       )}
//                       {hasFolderBookmarks && (
//                         <section {...getSectionProps()}>
//                           <div {...getSectionHeaderProps()}>
//                             <Icon
//                               {...getSectionIconProps(
//                                 'solar:folder-bold',
//                                 'text-primary'
//                               )}
//                             />
//                             <h3 {...getSectionTitleProps('Folders')} />
// //                           </div>
//                           {renderFolderBookmarks()}
//                         </section>
//                       )}
//                     </div>
//                   )}
//                   <DragOverlay
//                     dropAnimation={{
//                       sideEffects: defaultDropAnimationSideEffects({
//                         styles: {
//                           active: {
//                             opacity: '0.4',
//                           },
//                         },
//                       }),
//                     }}
//                   >
//                     {activeFavorite && (
//                       <div {...getFavoriteItemProps()} style={{ opacity: 0.8, cursor: 'grabbing' }}>
//                         {activeFavorite.backgroundImage ? (
//                           <img
//                             {...getFavoriteBackgroundImageProps(
//                               activeFavorite.backgroundImage,
//                               activeFavorite.name
//                             )}
//                           />
//                         ) : (
//                           <div {...getFavoriteBackgroundGradientProps()} />
//                         )}
//                         <div {...getFavoriteOverlayProps()} />
//                         <div {...getFavoriteAvatarContainerProps()}>
//                           <Avatar {...getFavoriteAvatarProps()}>
//                             {activeFavorite.avatar && <Avatar.Image src={activeFavorite.avatar} alt={activeFavorite.name} />}
//                             <Avatar.Fallback {...getFavoriteAvatarFallbackProps(activeFavorite.name)}>
//                               <Icon {...getFavoriteAvatarIconProps()} />
//                             </Avatar.Fallback>
//                           </Avatar>
//                         </div>
//                         <div {...getFavoriteContentProps()}>
//                           <p {...getFavoriteNameProps(activeFavorite.name)} />
//                         </div>
//                       </div>
//                     )}
//                     {activeBookmark && (
//                       <div {...getBookmarkItemProps()} style={{ opacity: 0.8, cursor: 'grabbing', backgroundColor: 'var(--default-100)', borderRadius: '0.5rem', padding: '0.5rem 0.75rem' }}>
//                         <Avatar {...getBookmarkAvatarProps()}>
//                           {activeBookmark.avatar && (
//                             <Avatar.Image src={activeBookmark.avatar} alt={activeBookmark.name} />
//                           )}
//                           <Avatar.Fallback {...getBookmarkAvatarFallbackProps(activeBookmark.name)} />
//                         </Avatar>
//                         <div {...getBookmarkContentProps()}>
//                           <p {...getBookmarkNameProps(activeBookmark.name)} />
//                           {activeBookmark.url && (
//                             <p {...getBookmarkUrlProps(activeBookmark.url)} />
//                           )}
//                         </div>
//                       </div>
//                     )}
//                     {activeFolder && (
//                       <div {...getFolderTriggerProps()} style={{ opacity: 0.8, cursor: 'grabbing', backgroundColor: 'var(--default-100)', borderRadius: '0.5rem', padding: '0.5rem' }}>
//                         <div {...getFolderTriggerContentProps()}>
//                           <Icon {...getFolderIconProps()} />
//                           <span {...getFolderNameProps(activeFolder)} />
//                           <span {...getFolderCountProps(bookmarksByFolder[activeFolder].length)} />
//                         </div>
//                       </div>
//                     )}
//                   </DragOverlay>
//                 </DndContext>
//               </ScrollShadow>
//             </Drawer.Body>
//           </Drawer.Dialog>
//         </Drawer.Content>
//       </Drawer>
//     </Component>
//   )
// })
// BookmarksDrawer.displayName = 'BookmarksDrawer'
// export { BookmarksDrawer }

// import {
//   DndContext,
//   DragEndEvent,
//   DragOverlay,
//   DragStartEvent,
//   KeyboardSensor,
//   PointerSensor,
//   closestCenter,
//   defaultDropAnimationSideEffects,
//   useSensor,
//   useSensors
// } from '@dnd-kit/core'
// import {
//   SortableContext,
//   arrayMove,
//   horizontalListSortingStrategy,
//   rectSortingStrategy,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy
// } from '@dnd-kit/sortable'
// import { Icon } from '@iconify/react'
// import { useMemo, useState } from 'react'
// import React from 'react'

// import { forwardRef } from '@vezham/react-utils'
// import {
//   Accordion,
//   Avatar,
//   Button,
//   Drawer,
//   Input,
//   ScrollShadow
// } from '@vezham/react/v3'

// import { SortableBookmarkItem } from './SortableBookMarksItem'
// import { SortableFavoriteItem } from './SortableFavoriteItem'
// import { SortableFolderItem } from './SortableFolderItem'
// import { sampleBookmarks, sampleFavorites } from './data'
// import { BookmarkItem, FavoriteItem, Props, useProps } from './types'

// const BookmarksDrawer = forwardRef<'div', Props>((props, ref) => {
//   const {
//     Component,
//     getDrawerDialogProps,
//     getDrawerBodyProps,
//     getSearchContainerProps,
//     getSearchInputProps,
//     getScrollShadowProps,
//     getEmptyContainerProps,
//     getEmptyIconProps,
//     getEmptyTitleProps,
//     getEmptyDescriptionProps,
//     getContentContainerProps,
//     getSectionProps,
//     getSectionHeaderProps,
//     getSectionIconProps,
//     getSectionTitleProps,
//     getFavoritesGridProps,
//     getFavorites2GridProps,
//     getFavoriteItemProps,
//     getFavorite2ItemsProps,
//     getFavoriteBackgroundImageProps,
//     getFavoriteBackgroundGradientProps,
//     getFavoriteOverlayProps,
//     getFavoriteAvatarContainerProps,
//     getFavoriteAvatarProps,
//     getFavoriteAvatarIconProps,
//     getFavoriteAvatarFallbackProps,
//     getFavoriteContentProps,
//     getFavoriteNameProps,
//     getBookmarksListProps,
//     getBookmarkItemProps,
//     getBookmarkAvatarProps,
//     getBookmarkAvatarFallbackProps,
//     getBookmarkContentProps,
//     getBookmarkNameProps,
//     getBookmarkUrlProps,
//     getBookmarkDeleteButtonProps,
//     getFolderAccordionProps,
//     getFolderItemProps,
//     getFolderHeadingProps,
//     getFolderTriggerProps,
//     getFolderTriggerContentProps,
//     getFolderIconProps,
//     getFolderNameProps,
//     getFolderCountProps,
//     getFolderIndicatorProps,
//     getFolderPanelProps,
//     getFolderBodyProps,
//     isOpen,
//     onClose,
//     placement,
//     externalFavorites,
//     externalBookmarks,
//     onFavoriteClick,
//     onBookmarkClick,
//     onBookmarkDelete,
//     renderFavoriteItem,
//     renderBookmarkItem,
//     renderFolderItem,
//     onFavoritesReorder,
//     onBookmarksReorder,
//     onFolderReorder
//   } = useProps({
//     ...props,
//     ref
//   })

//   const [searchQuery, setSearchQuery] = useState('')
//   const [internalFavorites, setInternalFavorites] =
//     useState<FavoriteItem[]>(sampleFavorites)
//   const [internalBookmarks, setInternalBookmarks] =
//     useState<BookmarkItem[]>(sampleBookmarks)
//   const [hoveredBookmarkId, setHoveredBookmarkId] = useState<string | null>(
//     null
//   )
//   const [activeId, setActiveId] = useState<string | null>(null)
//   const [activeType, setActiveType] = useState<
//     'favorite' | 'bookmark' | 'folder' | null
//   >(null)

//   const favorites = externalFavorites || internalFavorites
//   const bookmarks = externalBookmarks || internalBookmarks

//   // Sensors for drag and drop
//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 8
//       }
//     }),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates
//     })
//   )

//   const filteredFavorites = favorites.filter(item =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   const filteredBookmarks = bookmarks.filter(item =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   const folderBookmarks = filteredBookmarks.filter(b => b.folder)
//   const singleBookmarks = filteredBookmarks.filter(b => !b.folder)

//   // Create a map of folders to their bookmarks
//   const bookmarksByFolder = useMemo(() => {
//     return folderBookmarks.reduce(
//       (acc, bookmark) => {
//         const folder = bookmark.folder!
//         if (!acc[folder]) {
//           acc[folder] = []
//         }
//         acc[folder].push(bookmark)
//         return acc
//       },
//       {} as Record<string, BookmarkItem[]>
//     )
//   }, [folderBookmarks])

//   // Get sorted folder names based on the actual order in bookmarks array
//   const folderNames = useMemo(() => {
//     const folders = Object.keys(bookmarksByFolder)
//     // Sort folders based on the order they appear in the original bookmarks array
//     return folders.sort((a, b) => {
//       const firstA = folderBookmarks.find(bm => bm.folder === a)
//       const firstB = folderBookmarks.find(bm => bm.folder === b)
//       if (!firstA || !firstB) return 0
//       return folderBookmarks.indexOf(firstA) - folderBookmarks.indexOf(firstB)
//     })
//   }, [bookmarksByFolder, folderBookmarks])

//   const hasFavorites = filteredFavorites.length > 0
//   const hasFolderBookmarks = folderNames.length > 0
//   const hasSingleBookmarks = singleBookmarks.length > 0
//   const hasBookmarks = hasFolderBookmarks || hasSingleBookmarks

//   // Drag and drop handlers
//   const handleDragStart = (event: DragStartEvent) => {
//     const { active } = event
//     setActiveId(active.id as string)

//     // Determine the type of item being dragged
//     if (filteredFavorites.some(f => f.id === active.id)) {
//       setActiveType('favorite')
//     } else if (singleBookmarks.some(b => b.id === active.id)) {
//       setActiveType('bookmark')
//     } else if (folderNames.includes(active.id as string)) {
//       setActiveType('folder')
//     }
//   }

//   const handleFavoriteDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event
//     setActiveId(null)
//     setActiveType(null)

//     if (active.id !== over?.id && over?.id) {
//       const oldIndex = filteredFavorites.findIndex(
//         item => item.id === active.id
//       )
//       const newIndex = filteredFavorites.findIndex(item => item.id === over.id)

//       if (oldIndex !== -1 && newIndex !== -1) {
//         const newFavorites = arrayMove(filteredFavorites, oldIndex, newIndex)

//         if (!externalFavorites) {
//           setInternalFavorites(newFavorites)
//         } else if (onFavoritesReorder) {
//           onFavoritesReorder(newFavorites)
//         }
//       }
//     }
//   }

//   const handleBookmarkDragEnd = (
//     event: DragEndEvent,
//     bookmarkList: BookmarkItem[],
//     isSingleBookmark: boolean
//   ) => {
//     const { active, over } = event
//     setActiveId(null)
//     setActiveType(null)

//     if (active.id !== over?.id && over?.id) {
//       const oldIndex = bookmarkList.findIndex(item => item.id === active.id)
//       const newIndex = bookmarkList.findIndex(item => item.id === over.id)

//       if (oldIndex !== -1 && newIndex !== -1) {
//         const newBookmarkList = arrayMove(bookmarkList, oldIndex, newIndex)

//         if (isSingleBookmark) {
//           // Update single bookmarks while preserving folder bookmarks
//           const otherBookmarks = bookmarks.filter(b => b.folder)
//           const finalBookmarks = [...newBookmarkList, ...otherBookmarks]

//           if (!externalBookmarks) {
//             setInternalBookmarks(finalBookmarks)
//           } else if (onBookmarksReorder) {
//             onBookmarksReorder(finalBookmarks)
//           }
//         } else {
//           // Update folder bookmarks - preserve the folder structure
//           const otherBookmarks = bookmarks.filter(b => !b.folder)
//           const finalBookmarks = [...otherBookmarks, ...newBookmarkList]

//           if (!externalBookmarks) {
//             setInternalBookmarks(finalBookmarks)
//           } else if (onBookmarksReorder) {
//             onBookmarksReorder(finalBookmarks)
//           }
//         }
//       }
//     }
//   }

//   const handleFolderDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event
//     setActiveId(null)
//     setActiveType(null)

//     if (active.id !== over?.id && over?.id) {
//       const oldIndex = folderNames.findIndex(folder => folder === active.id)
//       const newIndex = folderNames.findIndex(folder => folder === over.id)

//       if (oldIndex !== -1 && newIndex !== -1) {
//         // Get all bookmarks that are not in folders
//         const nonFolderBookmarks = bookmarks.filter(b => !b.folder)

//         // Create a new array with reordered folders
//         const reorderedFolders = arrayMove(folderNames, oldIndex, newIndex)

//         // Rebuild the bookmarks array with new folder order
//         const newBookmarks: BookmarkItem[] = [...nonFolderBookmarks]

//         reorderedFolders.forEach(folder => {
//           newBookmarks.push(...bookmarksByFolder[folder])
//         })

//         if (!externalBookmarks) {
//           setInternalBookmarks(newBookmarks)
//         } else if (onFolderReorder) {
//           onFolderReorder(newBookmarks)
//         }
//       }
//     }
//   }

//   const handleItemClick = (url: string, item?: FavoriteItem | BookmarkItem) => {
//     if (url && url !== '#') {
//       window.open(url.startsWith('http') ? url : `https://${url}`, '_blank')
//     }
//   }

//   const handleFavoriteClick = (url: string, item: FavoriteItem) => {
//     if (onFavoriteClick) {
//       onFavoriteClick(url, item)
//     } else {
//       handleItemClick(url, item)
//     }
//   }

//   const handleBookmarkClick = (url: string, item: BookmarkItem) => {
//     if (onBookmarkClick) {
//       onBookmarkClick(url, item)
//     } else {
//       handleItemClick(url, item)
//     }
//   }

//   const handleBookmarkDelete = (item: BookmarkItem, e: React.MouseEvent) => {
//     e.stopPropagation()
//     if (onBookmarkDelete) {
//       onBookmarkDelete(item.id, item)
//     } else {
//       setInternalBookmarks(prev => prev.filter(b => b.id !== item.id))
//     }
//   }

//   const handleFolderBookmarkDragEnd = (
//     event: DragEndEvent,
//     folderName: string
//   ) => {
//     const { active, over } = event
//     if (active.id !== over?.id && over?.id) {
//       const folderItems = bookmarksByFolder[folderName]
//       const oldIndex = folderItems.findIndex(item => item.id === active.id)
//       const newIndex = folderItems.findIndex(item => item.id === over.id)

//       if (oldIndex !== -1 && newIndex !== -1) {
//         const reorderedFolderItems = arrayMove(folderItems, oldIndex, newIndex)

//         // Rebuild the entire bookmarks array
//         const nonFolderBookmarks = bookmarks.filter(b => !b.folder)
//         const newBookmarks: BookmarkItem[] = [...nonFolderBookmarks]

//         folderNames.forEach(folder => {
//           if (folder === folderName) {
//             newBookmarks.push(...reorderedFolderItems)
//           } else {
//             newBookmarks.push(...bookmarksByFolder[folder])
//           }
//         })

//         if (!externalBookmarks) {
//           setInternalBookmarks(newBookmarks)
//         } else if (onBookmarksReorder) {
//           onBookmarksReorder(newBookmarks)
//         }
//       }
//     }
//   }

//   const renderFavoriteItemsForGrid1 = () => {
//     if (renderFavoriteItem) {
//       return filteredFavorites.map(item => (
//         <React.Fragment key={item.id}>
//           {renderFavoriteItem({
//             item,
//             onItemClick: url => handleFavoriteClick(url, item)
//           })}
//         </React.Fragment>
//       ))
//     }

//     return (
//       <SortableContext
//         items={filteredFavorites.map(f => f.id)}
//         strategy={rectSortingStrategy}>
//         {filteredFavorites.map(item => (
//           <SortableFavoriteItem
//             key={item.id}
//             id={item.id}
//             item={item}
//             getFavoriteItemProps={getFavoriteItemProps}
//             getFavoriteBackgroundImageProps={getFavoriteBackgroundImageProps}
//             getFavoriteBackgroundGradientProps={
//               getFavoriteBackgroundGradientProps
//             }
//             getFavoriteOverlayProps={getFavoriteOverlayProps}
//             getFavoriteAvatarContainerProps={getFavoriteAvatarContainerProps}
//             getFavoriteAvatarProps={getFavoriteAvatarProps}
//             getFavoriteAvatarIconProps={getFavoriteAvatarIconProps}
//             getFavoriteAvatarFallbackProps={getFavoriteAvatarFallbackProps}
//             getFavoriteContentProps={getFavoriteContentProps}
//             getFavoriteNameProps={getFavoriteNameProps}
//             onClick={() => handleFavoriteClick(item.url, item)}
//           />
//         ))}
//       </SortableContext>
//     )
//   }

//   const renderFavoriteItemsForGrid2 = () => {
//     if (renderFavoriteItem) {
//       return filteredFavorites.map(item => (
//         <React.Fragment key={item.id}>
//           {renderFavoriteItem({
//             item,
//             onItemClick: url => handleFavoriteClick(url, item)
//           })}
//         </React.Fragment>
//       ))
//     }

//     return (
//       <SortableContext
//         items={filteredFavorites.map(f => f.id)}
//         strategy={horizontalListSortingStrategy}>
//         {filteredFavorites.map(item => (
//           <SortableFavoriteItem
//             key={item.id}
//             id={item.id}
//             item={item}
//             getFavoriteItemProps={getFavorite2ItemsProps}
//             getFavoriteBackgroundImageProps={getFavoriteBackgroundImageProps}
//             getFavoriteBackgroundGradientProps={
//               getFavoriteBackgroundGradientProps
//             }
//             getFavoriteOverlayProps={getFavoriteOverlayProps}
//             getFavoriteAvatarContainerProps={getFavoriteAvatarContainerProps}
//             getFavoriteAvatarProps={getFavoriteAvatarProps}
//             getFavoriteAvatarIconProps={getFavoriteAvatarIconProps}
//             getFavoriteAvatarFallbackProps={getFavoriteAvatarFallbackProps}
//             getFavoriteContentProps={getFavoriteContentProps}
//             getFavoriteNameProps={getFavoriteNameProps}
//             onClick={() => handleFavoriteClick(item.url, item)}
//           />
//         ))}
//       </SortableContext>
//     )
//   }

//   const renderBookmarkItems = (
//     items: BookmarkItem[],
//     isFolderContent: boolean,
//     folderName?: string
//   ) => {
//     if (renderBookmarkItem) {
//       return items.map(item => (
//         <React.Fragment key={item.id}>
//           {renderBookmarkItem({
//             item,
//             onItemClick: url => handleBookmarkClick(url, item)
//           })}
//         </React.Fragment>
//       ))
//     }

//     const handleDragEnd =
//       isFolderContent && folderName
//         ? (event: DragEndEvent) =>
//             handleFolderBookmarkDragEnd(event, folderName)
//         : (event: DragEndEvent) =>
//             handleBookmarkDragEnd(event, items, !isFolderContent)

//     return (
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}>
//         <SortableContext
//           items={items.map(b => b.id)}
//           strategy={verticalListSortingStrategy}>
//           {items.map(bookmark => (
//             <SortableBookmarkItem
//               key={bookmark.id}
//               id={bookmark.id}
//               item={bookmark}
//               getBookmarkItemProps={getBookmarkItemProps}
//               getBookmarkAvatarProps={getBookmarkAvatarProps}
//               getBookmarkAvatarFallbackProps={getBookmarkAvatarFallbackProps}
//               getBookmarkContentProps={getBookmarkContentProps}
//               getBookmarkNameProps={getBookmarkNameProps}
//               getBookmarkUrlProps={getBookmarkUrlProps}
//               getBookmarkDeleteButtonProps={getBookmarkDeleteButtonProps}
//               onClick={() => handleBookmarkClick(bookmark.url, bookmark)}
//               onDelete={e => handleBookmarkDelete(bookmark, e)}
//               isHovered={hoveredBookmarkId === bookmark.id}
//               onMouseEnter={() => setHoveredBookmarkId(bookmark.id)}
//               onMouseLeave={() => setHoveredBookmarkId(null)}
//             />
//           ))}
//         </SortableContext>
//       </DndContext>
//     )
//   }

//   const renderFolderBookmarks = () => {
//     if (renderFolderItem) {
//       return folderNames.map(folder => (
//         <React.Fragment key={folder}>
//           {renderFolderItem(folder, bookmarksByFolder[folder], url =>
//             handleBookmarkClick(url, bookmarksByFolder[folder][0])
//           )}
//         </React.Fragment>
//       ))
//     }

//     return (
//       <SortableContext
//         items={folderNames}
//         strategy={verticalListSortingStrategy}>
//         {folderNames.map(folder => (
//           <SortableFolderItem
//             key={folder}
//             id={folder}
//             folder={folder}
//             items={bookmarksByFolder[folder]}
//             getFolderAccordionProps={getFolderAccordionProps}
//             getFolderItemProps={getFolderItemProps}
//             getFolderHeadingProps={getFolderHeadingProps}
//             getFolderTriggerProps={getFolderTriggerProps}
//             getFolderTriggerContentProps={getFolderTriggerContentProps}
//             getFolderIconProps={getFolderIconProps}
//             getFolderNameProps={getFolderNameProps}
//             getFolderCountProps={getFolderCountProps}
//             getFolderIndicatorProps={getFolderIndicatorProps}
//             getFolderPanelProps={getFolderPanelProps}
//             getFolderBodyProps={getFolderBodyProps}
//             renderBookmarkItems={(items, isFolderContent) =>
//               renderBookmarkItems(items, true, folder)
//             }
//           />
//         ))}
//       </SortableContext>
//     )
//   }

//   const getDragEndHandler = () => {
//     return (event: DragEndEvent) => {
//       const { active } = event

//       if (activeType === 'favorite') {
//         handleFavoriteDragEnd(event)
//       } else if (activeType === 'bookmark') {
//         handleBookmarkDragEnd(event, singleBookmarks, true)
//       } else if (activeType === 'folder') {
//         handleFolderDragEnd(event)
//       }

//       setActiveId(null)
//       setActiveType(null)
//     }
//   }

//   const activeFavorite =
//     activeId && activeType === 'favorite'
//       ? filteredFavorites.find(f => f.id === activeId)
//       : null
//   const activeBookmark =
//     activeId && activeType === 'bookmark'
//       ? singleBookmarks.find(b => b.id === activeId)
//       : null
//   const activeFolder =
//     activeId && activeType === 'folder'
//       ? folderNames.find(f => f === activeId)
//       : null

//   return (
//     <Component>
//       <Drawer isOpen={isOpen} onOpenChange={onClose}>
//         <Drawer.Content placement={placement}>
//           <Drawer.Dialog {...getDrawerDialogProps()}>
//             <Drawer.CloseTrigger />
//             <Drawer.Header>
//               <div {...getSearchContainerProps()}>
//                 <Input
//                   {...getSearchInputProps()}
//                   value={searchQuery}
//                   onChange={e => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </Drawer.Header>

//             <Drawer.Body {...getDrawerBodyProps()}>
//               <ScrollShadow {...getScrollShadowProps()}>
//                 <DndContext
//                   sensors={sensors}
//                   collisionDetection={closestCenter}
//                   onDragStart={handleDragStart}
//                   onDragEnd={getDragEndHandler()}>
//                   {!hasFavorites && !hasBookmarks ? (
//                     <div {...getEmptyContainerProps()}>
//                       <Icon {...getEmptyIconProps()} />
//                       <h2 {...getEmptyTitleProps()} />
//                       <p {...getEmptyDescriptionProps()} />
//                     </div>
//                   ) : (
//                     <div {...getContentContainerProps()}>
//                       {hasFavorites && (
//                         <>
//                           {/* Grid 1: Flex Wrap (Multiple Rows) */}
//                           <section {...getSectionProps()}>
//                             <div {...getSectionHeaderProps()}>
//                               <Icon
//                                 {...getSectionIconProps(
//                                   'solar:star-bold',
//                                   'text-warning'
//                                 )}
//                               />
//                               <h3
//                                 {...getSectionTitleProps('Favorites (Grid)')}
//                               />
//                             </div>
//                             <div {...getFavoritesGridProps()}>
//                               {renderFavoriteItemsForGrid1()}
//                             </div>
//                           </section>

//                           {/* Grid 2: Horizontal Scroll (Single Row) */}
//                           <section {...getSectionProps()}>
//                             <div {...getSectionHeaderProps()}>
//                               <Icon
//                                 {...getSectionIconProps(
//                                   'solar:star-bold',
//                                   'text-warning'
//                                 )}
//                               />
//                               <h3
//                                 {...getSectionTitleProps('Favorites (Scroll)')}
//                               />
//                             </div>
//                             <div {...getFavorites2GridProps()}>
//                               {renderFavoriteItemsForGrid2()}
//                             </div>
//                           </section>
//                         </>
//                       )}

//                       {hasSingleBookmarks && (
//                         <section {...getSectionProps()}>
//                           <div {...getSectionHeaderProps()}>
//                             <Icon
//                               {...getSectionIconProps(
//                                 'solar:bookmark-bold',
//                                 'text-primary'
//                               )}
//                             />
//                             <h3 {...getSectionTitleProps('Bookmarks')} />
//                           </div>
//                           <div {...getBookmarksListProps()}>
//                             {renderBookmarkItems(singleBookmarks, false)}
//                           </div>
//                         </section>
//                       )}

//                       {hasFolderBookmarks && (
//                         <section {...getSectionProps()}>
//                           {renderFolderBookmarks()}
//                         </section>
//                       )}
//                     </div>
//                   )}

//                   <DragOverlay
//                     dropAnimation={{
//                       sideEffects: defaultDropAnimationSideEffects({
//                         styles: {
//                           active: {
//                             opacity: '0.4'
//                           }
//                         }
//                       })
//                     }}>
//                     {activeFavorite && (
//                       <div
//                         {...getFavoriteItemProps()}
//                         style={{ opacity: 0.8, cursor: 'grabbing' }}>
//                         {activeFavorite.backgroundImage ? (
//                           <img
//                             {...getFavoriteBackgroundImageProps(
//                               activeFavorite.backgroundImage,
//                               activeFavorite.name
//                             )}
//                           />
//                         ) : (
//                           <div {...getFavoriteBackgroundGradientProps()} />
//                         )}
//                         <div {...getFavoriteOverlayProps()} />
//                         <div {...getFavoriteAvatarContainerProps()}>
//                           <Avatar {...getFavoriteAvatarProps()}>
//                             {activeFavorite.avatar && (
//                               <Avatar.Image
//                                 src={activeFavorite.avatar}
//                                 alt={activeFavorite.name}
//                               />
//                             )}
//                             <Avatar.Fallback
//                               {...getFavoriteAvatarFallbackProps(
//                                 activeFavorite.name
//                               )}>
//                               <Icon {...getFavoriteAvatarIconProps()} />
//                             </Avatar.Fallback>
//                           </Avatar>
//                         </div>
//                         <div {...getFavoriteContentProps()}>
//                           <p {...getFavoriteNameProps(activeFavorite.name)} />
//                         </div>
//                       </div>
//                     )}

//                     {activeBookmark && (
//                       <div
//                         {...getBookmarkItemProps()}
//                         style={{
//                           opacity: 0.8,
//                           cursor: 'grabbing',
//                           backgroundColor: 'var(--default-100)',
//                           borderRadius: '0.5rem',
//                           padding: '0.5rem 0.75rem'
//                         }}>
//                         <Avatar {...getBookmarkAvatarProps()}>
//                           {activeBookmark.avatar && (
//                             <Avatar.Image
//                               src={activeBookmark.avatar}
//                               alt={activeBookmark.name}
//                             />
//                           )}
//                           <Avatar.Fallback
//                             {...getBookmarkAvatarFallbackProps(
//                               activeBookmark.name
//                             )}
//                           />
//                         </Avatar>
//                         <div {...getBookmarkContentProps()}>
//                           <p {...getBookmarkNameProps(activeBookmark.name)} />
//                           {activeBookmark.url && (
//                             <p {...getBookmarkUrlProps(activeBookmark.url)} />
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {activeFolder && (
//                       <div
//                         {...getFolderTriggerProps()}
//                         style={{
//                           opacity: 0.8,
//                           cursor: 'grabbing',
//                           backgroundColor: 'var(--default-100)',
//                           borderRadius: '0.5rem',
//                           padding: '0.5rem'
//                         }}>
//                         <div {...getFolderTriggerContentProps()}>
//                           <Icon {...getFolderIconProps()} />
//                           <span {...getFolderNameProps(activeFolder)} />
//                           <span
//                             {...getFolderCountProps(
//                               bookmarksByFolder[activeFolder].length
//                             )}
//                           />
//                         </div>
//                       </div>
//                     )}
//                   </DragOverlay>
//                 </DndContext>
//               </ScrollShadow>
//             </Drawer.Body>
//           </Drawer.Dialog>
//         </Drawer.Content>
//       </Drawer>
//     </Component>
//   )
// })

// BookmarksDrawer.displayName = 'BookmarksDrawer'

// export { BookmarksDrawer }

'use client'

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { Icon } from '@iconify/react'
import { useMemo, useState } from 'react'
import React from 'react'

import { forwardRef } from '@vezham/react-utils'
import { Avatar, Button, Drawer, Input, ScrollShadow } from '@vezham/react/v3'

import { SortableBookmarkItem } from './SortableBookMarksItem'
import { SortableFavoriteItem } from './SortableFavoriteItem'
import { SortableFolderCard } from './SortableFolderCard'
import { sampleBookmarks, sampleFavorites } from './data'
import { BookmarkItem, FavoriteItem, Props, useProps } from './types'

// 'use client'
// import { Icon } from '@iconify/react'
// import { useState } from 'react'
// import React from 'react'
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragEndEvent,
//   DragStartEvent,
//   DragOverlay,
//   defaultDropAnimationSideEffects,
// } from '@dnd-kit/core'
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   rectSortingStrategy,
//   verticalListSortingStrategy,
//   horizontalListSortingStrategy,
// } from '@dnd-kit/sortable'
// import { forwardRef } from '@vezham/react-utils'
// import {
//   Accordion,
//   Avatar,
//   Button,
//   Drawer,
//   Input,
//   ScrollShadow
// } from '@vezham/react/v3'
// import { sampleBookmarks, sampleFavorites } from './data'
// import { BookmarkItem, FavoriteItem, Props, useProps } from './types'
// import { SortableFavoriteItem } from './SortableFavoriteItem'
// import { SortableBookmarkItem } from './SortableBookMarksItem'
// import { SortableFolderItem } from './SortableFolderItem'
// const BookmarksDrawer = forwardRef<'div', Props>((props, ref) => {
//   const {
//     Component,
//     getDrawerDialogProps,
//     getDrawerBodyProps,
//     getSearchContainerProps,
//     getSearchInputProps,
//     getScrollShadowProps,
//     getEmptyContainerProps,
//     getEmptyIconProps,
//     getEmptyTitleProps,
//     getEmptyDescriptionProps,
//     getContentContainerProps,
//     getSectionProps,
//     getSectionHeaderProps,
//     getSectionIconProps,
//     getSectionTitleProps,
//     getFavoritesGridProps,
//     getFavorites2GridProps,
//     getFavoriteItemProps,
//     getFavorite2ItemsProps,
//     getFavoriteBackgroundImageProps,
//     getFavoriteBackgroundGradientProps,
//     getFavoriteOverlayProps,
//     getFavoriteAvatarContainerProps,
//     getFavoriteAvatarProps,
//     getFavoriteAvatarIconProps,
//     getFavoriteAvatarFallbackProps,
//     getFavoriteContentProps,
//     getFavoriteNameProps,
//     getBookmarksListProps,
//     getBookmarkItemProps,
//     getBookmarkAvatarProps,
//     getBookmarkAvatarFallbackProps,
//     getBookmarkContentProps,
//     getBookmarkNameProps,
//     getBookmarkUrlProps,
//     getBookmarkDeleteButtonProps,
//     getFolderAccordionProps,
//     getFolderItemProps,
//     getFolderHeadingProps,
//     getFolderTriggerProps,
//     getFolderTriggerContentProps,
//     getFolderIconProps,
//     getFolderNameProps,
//     getFolderCountProps,
//     getFolderIndicatorProps,
//     getFolderPanelProps,
//     getFolderBodyProps,
//     isOpen,
//     onClose,
//     placement,
//     externalFavorites,
//     externalBookmarks,
//     onFavoriteClick,
//     onBookmarkClick,
//     onBookmarkDelete,
//     renderFavoriteItem,
//     renderBookmarkItem,
//     renderFolderItem,
//     onFavoritesReorder,
//     onBookmarksReorder,
//     onFolderReorder
//   } = useProps({
//     ...props,
//     ref
//   })
//   const [searchQuery, setSearchQuery] = useState('')
//   const [internalFavorites, setInternalFavorites] =
//     useState<FavoriteItem[]>(sampleFavorites)
//   const [internalBookmarks, setInternalBookmarks] =
//     useState<BookmarkItem[]>(sampleBookmarks)
//   const [hoveredBookmarkId, setHoveredBookmarkId] = useState<string | null>(
//     null
//   )
//   const [activeId, setActiveId] = useState<string | null>(null)
//   const [activeType, setActiveType] = useState<'favorite' | 'bookmark' | 'folder' | null>(null)
//   const favorites = externalFavorites || internalFavorites
//   const bookmarks = externalBookmarks || internalBookmarks
//   // Sensors for drag and drop
//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 8,
//       },
//     }),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   )
//   const filteredFavorites = favorites.filter(item =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   )
//   const filteredBookmarks = bookmarks.filter(item =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   )
//   const folderBookmarks = filteredBookmarks.filter(b => b.folder)
//   const singleBookmarks = filteredBookmarks.filter(b => !b.folder)
//   const bookmarksByFolder = folderBookmarks.reduce(
//     (acc, bookmark) => {
//       const folder = bookmark.folder!
//       if (!acc[folder]) {
//         acc[folder] = []
//       }
//       acc[folder].push(bookmark)
//       return acc
//     },
//     {} as Record<string, BookmarkItem[]>
//   )
//   const folderNames = Object.keys(bookmarksByFolder).sort()
//   const hasFavorites = filteredFavorites.length > 0
//   const hasFolderBookmarks = folderNames.length > 0
//   const hasSingleBookmarks = singleBookmarks.length > 0
//   const hasBookmarks = hasFolderBookmarks || hasSingleBookmarks
//   // Drag and drop handlers
//   const handleDragStart = (event: DragStartEvent) => {
//     const { active } = event
//     setActiveId(active.id as string)
//     // Determine the type of item being dragged
//     if (filteredFavorites.some(f => f.id === active.id)) {
//       setActiveType('favorite')
//     } else if (singleBookmarks.some(b => b.id === active.id)) {
//       setActiveType('bookmark')
//     } else if (folderNames.includes(active.id as string)) {
//       setActiveType('folder')
//     }
//   }
//   const handleFavoriteDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event
//     setActiveId(null)
//     setActiveType(null)
//     if (active.id !== over?.id) {
//       const oldIndex = filteredFavorites.findIndex((item) => item.id === active.id)
//       const newIndex = filteredFavorites.findIndex((item) => item.id === over?.id)
//       if (oldIndex !== -1 && newIndex !== -1) {
//         const newFavorites = arrayMove(filteredFavorites, oldIndex, newIndex)
//         if (!externalFavorites) {
//           setInternalFavorites(newFavorites)
//         } else if (onFavoritesReorder) {
//           onFavoritesReorder(newFavorites)
//         }
//       }
//     }
//   }
//   const handleBookmarkDragEnd = (event: DragEndEvent, bookmarkList: BookmarkItem[], isSingleBookmark: boolean = true) => {
//     const { active, over } = event
//     setActiveId(null)
//     setActiveType(null)
//     if (active.id !== over?.id) {
//       const oldIndex = bookmarkList.findIndex((item) => item.id === active.id)
//       const newIndex = bookmarkList.findIndex((item) => item.id === over?.id)
//       if (oldIndex !== -1 && newIndex !== -1) {
//         const newBookmarkList = arrayMove(bookmarkList, oldIndex, newIndex)
//         if (isSingleBookmark) {
//           // Update single bookmarks while preserving folder bookmarks
//           const otherBookmarks = bookmarks.filter(b => b.folder)
//           const finalBookmarks = [...newBookmarkList, ...otherBookmarks]
//           if (!externalBookmarks) {
//             setInternalBookmarks(finalBookmarks)
//           } else if (onBookmarksReorder) {
//             onBookmarksReorder(finalBookmarks)
//           }
//         } else {
//           // Update folder bookmarks
//           const otherBookmarks = bookmarks.filter(b => !b.folder)
//           const finalBookmarks = [...otherBookmarks, ...newBookmarkList]
//           if (!externalBookmarks) {
//             setInternalBookmarks(finalBookmarks)
//           } else if (onBookmarksReorder) {
//             onBookmarksReorder(finalBookmarks)
//           }
//         }
//       }
//     }
//   }
//   const handleFolderDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event
//     setActiveId(null)
//     setActiveType(null)
//     if (active.id !== over?.id) {
//       const oldIndex = folderNames.findIndex((folder) => folder === active.id)
//       const newIndex = folderNames.findIndex((folder) => folder === over?.id)
//       if (oldIndex !== -1 && newIndex !== -1) {
//         const newFolderNames = arrayMove(folderNames, oldIndex, newIndex)
//         // Reorganize bookmarks based on new folder order
//         const newBookmarks: BookmarkItem[] = []
//         // Add single bookmarks first
//         newBookmarks.push(...singleBookmarks)
//         // Add folder bookmarks in new order
//         newFolderNames.forEach(folder => {
//           newBookmarks.push(...bookmarksByFolder[folder])
//         })
//         if (!externalBookmarks) {
//           setInternalBookmarks(newBookmarks)
//         } else if (onFolderReorder) {
//           onFolderReorder(newBookmarks)
//         }
//       }
//     }
//   }
//   const handleItemClick = (url: string, item?: FavoriteItem | BookmarkItem) => {
//     if (url && url !== '#') {
//       window.open(url.startsWith('http') ? url : `https://${url}`, '_blank')
//     }
//   }
//   const handleFavoriteClick = (url: string, item: FavoriteItem) => {
//     if (onFavoriteClick) {
//       onFavoriteClick(url, item)
//     } else {
//       handleItemClick(url, item)
//     }
//   }
//   const handleBookmarkClick = (url: string, item: BookmarkItem) => {
//     if (onBookmarkClick) {
//       onBookmarkClick(url, item)
//     } else {
//       handleItemClick(url, item)
//     }
//   }
//   const handleBookmarkDelete = (item: BookmarkItem, e: React.MouseEvent) => {
//     e.stopPropagation()
//     if (onBookmarkDelete) {
//       onBookmarkDelete(item.id, item)
//     } else {
//       setInternalBookmarks(prev => prev.filter(b => b.id !== item.id))
//     }
//   }
//   const renderFavoriteItemsForGrid1 = () => {
//     if (renderFavoriteItem) {
//       return filteredFavorites.map(item => (
//         <React.Fragment key={item.id}>
//           {renderFavoriteItem({
//             item,
//             onItemClick: url => handleFavoriteClick(url, item)
//           })}
//         </React.Fragment>
//       ))
//     }
//     return (
//       <SortableContext items={filteredFavorites.map(f => f.id)} strategy={rectSortingStrategy}>
//         {filteredFavorites.map(item => (
//           <SortableFavoriteItem
//             key={item.id}
//             id={item.id}
//             item={item}
//             getFavoriteItemProps={getFavoriteItemProps}
//             getFavoriteBackgroundImageProps={getFavoriteBackgroundImageProps}
//             getFavoriteBackgroundGradientProps={getFavoriteBackgroundGradientProps}
//             getFavoriteOverlayProps={getFavoriteOverlayProps}
//             getFavoriteAvatarContainerProps={getFavoriteAvatarContainerProps}
//             getFavoriteAvatarProps={getFavoriteAvatarProps}
//             getFavoriteAvatarIconProps={getFavoriteAvatarIconProps}
//             getFavoriteAvatarFallbackProps={getFavoriteAvatarFallbackProps}
//             getFavoriteContentProps={getFavoriteContentProps}
//             getFavoriteNameProps={getFavoriteNameProps}
//             onClick={() => handleFavoriteClick(item.url, item)}
//           />
//         ))}
//       </SortableContext>
//     )
//   }
//   const renderFavoriteItemsForGrid2 = () => {
//     if (renderFavoriteItem) {
//       return filteredFavorites.map(item => (
//         <React.Fragment key={item.id}>
//           {renderFavoriteItem({
//             item,
//             onItemClick: url => handleFavoriteClick(url, item)
//           })}
//         </React.Fragment>
//       ))
//     }
//     return (
//       <SortableContext items={filteredFavorites.map(f => f.id)} strategy={horizontalListSortingStrategy}>
//         {filteredFavorites.map(item => (
//           <SortableFavoriteItem
//             key={item.id}
//             id={item.id}
//             item={item}
//             getFavoriteItemProps={getFavorite2ItemsProps}
//             getFavoriteBackgroundImageProps={getFavoriteBackgroundImageProps}
//             getFavoriteBackgroundGradientProps={getFavoriteBackgroundGradientProps}
//             getFavoriteOverlayProps={getFavoriteOverlayProps}
//             getFavoriteAvatarContainerProps={getFavoriteAvatarContainerProps}
//             getFavoriteAvatarProps={getFavoriteAvatarProps}
//             getFavoriteAvatarIconProps={getFavoriteAvatarIconProps}
//             getFavoriteAvatarFallbackProps={getFavoriteAvatarFallbackProps}
//             getFavoriteContentProps={getFavoriteContentProps}
//             getFavoriteNameProps={getFavoriteNameProps}
//             onClick={() => handleFavoriteClick(item.url, item)}
//           />
//         ))}
//       </SortableContext>
//     )
//   }
//   const renderBookmarkItems = (items: BookmarkItem[], isFolderContent: boolean = false) => {
//     if (renderBookmarkItem) {
//       return items.map(item => (
//         <React.Fragment key={item.id}>
//           {renderBookmarkItem({
//             item,
//             onItemClick: url => handleBookmarkClick(url, item)
//           })}
//         </React.Fragment>
//       ))
//     }
//     return (
//       <SortableContext items={items.map(b => b.id)} strategy={verticalListSortingStrategy}>
//         {items.map(bookmark => (
//           <SortableBookmarkItem
//             key={bookmark.id}
//             id={bookmark.id}
//             item={bookmark}
//             getBookmarkItemProps={getBookmarkItemProps}
//             getBookmarkAvatarProps={getBookmarkAvatarProps}
//             getBookmarkAvatarFallbackProps={getBookmarkAvatarFallbackProps}
//             getBookmarkContentProps={getBookmarkContentProps}
//             getBookmarkNameProps={getBookmarkNameProps}
//             getBookmarkUrlProps={getBookmarkUrlProps}
//             getBookmarkDeleteButtonProps={getBookmarkDeleteButtonProps}
//             onClick={() => handleBookmarkClick(bookmark.url, bookmark)}
//             onDelete={(e) => handleBookmarkDelete(bookmark, e)}
//             isHovered={hoveredBookmarkId === bookmark.id}
//             onMouseEnter={() => setHoveredBookmarkId(bookmark.id)}
//             onMouseLeave={() => setHoveredBookmarkId(null)}
//           />
//         ))}
//       </SortableContext>
//     )
//   }
//   const renderFolderBookmarks = () => {
//     if (renderFolderItem) {
//       return folderNames.map(folder => (
//         <React.Fragment key={folder}>
//           {renderFolderItem(folder, bookmarksByFolder[folder], url =>
//             handleBookmarkClick(url, bookmarksByFolder[folder][0])
//           )}
//         </React.Fragment>
//       ))
//     }
//     return (
//       <SortableContext items={folderNames} strategy={verticalListSortingStrategy}>
//         {folderNames.map(folder => (
//           <SortableFolderItem
//             key={folder}
//             id={folder}
//             folder={folder}
//             items={bookmarksByFolder[folder]}
//             getFolderAccordionProps={getFolderAccordionProps}
//             getFolderItemProps={getFolderItemProps}
//             getFolderHeadingProps={getFolderHeadingProps}
//             getFolderTriggerProps={getFolderTriggerProps}
//             getFolderTriggerContentProps={getFolderTriggerContentProps}
//             getFolderIconProps={getFolderIconProps}
//             getFolderNameProps={getFolderNameProps}
//             getFolderCountProps={getFolderCountProps}
//             getFolderIndicatorProps={getFolderIndicatorProps}
//             getFolderPanelProps={getFolderPanelProps}
//             getFolderBodyProps={getFolderBodyProps}
//             renderBookmarkItems={renderBookmarkItems}
//           />
//         ))}
//       </SortableContext>
//     )
//   }
//   const getDragEndHandler = () => {
//     return (event: DragEndEvent) => {
//       const { active } = event
//       if (activeType === 'favorite') {
//         handleFavoriteDragEnd(event)
//       } else if (activeType === 'bookmark') {
//         handleBookmarkDragEnd(event, singleBookmarks, true)
//       } else if (activeType === 'folder') {
//         handleFolderDragEnd(event)
//       }
//       setActiveId(null)
//       setActiveType(null)
//     }
//   }
//   const activeFavorite = activeId && activeType === 'favorite' ? filteredFavorites.find(f => f.id === activeId) : null
//   const activeBookmark = activeId && activeType === 'bookmark' ? singleBookmarks.find(b => b.id === activeId) : null
//   const activeFolder = activeId && activeType === 'folder' ? folderNames.find(f => f === activeId) : null
//   return (
//     <Component>
//       <Drawer isOpen={isOpen} onOpenChange={onClose}>
//         <Drawer.Content placement={placement}>
//           <Drawer.Dialog {...getDrawerDialogProps()}>
//             <Drawer.CloseTrigger />
//             <Drawer.Header>
//               <div {...getSearchContainerProps()}>
//                 <Input
//                   {...getSearchInputProps()}
//                   value={searchQuery}
//                   onChange={e => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </Drawer.Header>
//             <Drawer.Body {...getDrawerBodyProps()}>
//               <ScrollShadow {...getScrollShadowProps()}>
//                 <DndContext
//                   sensors={sensors}
//                   collisionDetection={closestCenter}
//                   onDragStart={handleDragStart}
//                   onDragEnd={getDragEndHandler()}
//                 >
//                   {!hasFavorites && !hasBookmarks ? (
//                     <div {...getEmptyContainerProps()}>
//                       <Icon {...getEmptyIconProps()} />
//                       <h2 {...getEmptyTitleProps()} />
//                       <p {...getEmptyDescriptionProps()} />
//                     </div>
//                   ) : (
//                     <div {...getContentContainerProps()}>
//                       {hasFavorites && (
//                         <>
//                           {/* Grid 1: Flex Wrap (Multiple Rows) */}
//                           <section {...getSectionProps()}>
//                             <div {...getSectionHeaderProps()}>
//                               <Icon
//                                 {...getSectionIconProps(
//                                   'solar:star-bold',
//                                   'text-warning'
//                                 )}
//                               />
//                               <h3 {...getSectionTitleProps('Favorites (Grid)')} />
//                               <span className="ml-auto text-xs text-default-400">Drag to reorder</span>
//                             </div>
//                             <div {...getFavoritesGridProps()}>
//                               {renderFavoriteItemsForGrid1()}
//                             </div>
//                           </section>
//                           {/* Grid 2: Horizontal Scroll (Single Row) */}
//                           <section {...getSectionProps()}>
//                             <div {...getSectionHeaderProps()}>
//                               <Icon
//                                 {...getSectionIconProps(
//                                   'solar:star-bold',
//                                   'text-warning'
//                                 )}
//                               />
//                               <h3
//                                 {...getSectionTitleProps('Favorites (Scroll)')}
//                               />
//                               <span className="ml-auto text-xs text-default-400">Drag to reorder</span>
//                             </div>
//                             <div {...getFavorites2GridProps()}>
//                               {renderFavoriteItemsForGrid2()}
//                             </div>
//                           </section>
//                         </>
//                       )}
//                       {hasSingleBookmarks && (
//                         <section {...getSectionProps()}>
//                           <div {...getSectionHeaderProps()}>
//                             <Icon
//                               {...getSectionIconProps(
//                                 'solar:bookmark-bold',
//                                 'text-primary'
//                               )}
//                             />
//                             <h3 {...getSectionTitleProps('Bookmarks')} />
//                             <span className="ml-auto text-xs text-default-400">Drag to reorder</span>
//                           </div>
//                           <div {...getBookmarksListProps()}>
//                             {renderBookmarkItems(singleBookmarks, false)}
//                           </div>
//                         </section>
//                       )}
//                       {hasFolderBookmarks && (
//                         <section {...getSectionProps()}>
//                           <div {...getSectionHeaderProps()}>
//                             <Icon
//                               {...getSectionIconProps(
//                                 'solar:folder-bold',
//                                 'text-primary'
//                               )}
//                             />
//                             <h3 {...getSectionTitleProps('Folders')} />
// //                           </div>
//                           {renderFolderBookmarks()}
//                         </section>
//                       )}
//                     </div>
//                   )}
//                   <DragOverlay
//                     dropAnimation={{
//                       sideEffects: defaultDropAnimationSideEffects({
//                         styles: {
//                           active: {
//                             opacity: '0.4',
//                           },
//                         },
//                       }),
//                     }}
//                   >
//                     {activeFavorite && (
//                       <div {...getFavoriteItemProps()} style={{ opacity: 0.8, cursor: 'grabbing' }}>
//                         {activeFavorite.backgroundImage ? (
//                           <img
//                             {...getFavoriteBackgroundImageProps(
//                               activeFavorite.backgroundImage,
//                               activeFavorite.name
//                             )}
//                           />
//                         ) : (
//                           <div {...getFavoriteBackgroundGradientProps()} />
//                         )}
//                         <div {...getFavoriteOverlayProps()} />
//                         <div {...getFavoriteAvatarContainerProps()}>
//                           <Avatar {...getFavoriteAvatarProps()}>
//                             {activeFavorite.avatar && <Avatar.Image src={activeFavorite.avatar} alt={activeFavorite.name} />}
//                             <Avatar.Fallback {...getFavoriteAvatarFallbackProps(activeFavorite.name)}>
//                               <Icon {...getFavoriteAvatarIconProps()} />
//                             </Avatar.Fallback>
//                           </Avatar>
//                         </div>
//                         <div {...getFavoriteContentProps()}>
//                           <p {...getFavoriteNameProps(activeFavorite.name)} />
//                         </div>
//                       </div>
//                     )}
//                     {activeBookmark && (
//                       <div {...getBookmarkItemProps()} style={{ opacity: 0.8, cursor: 'grabbing', backgroundColor: 'var(--default-100)', borderRadius: '0.5rem', padding: '0.5rem 0.75rem' }}>
//                         <Avatar {...getBookmarkAvatarProps()}>
//                           {activeBookmark.avatar && (
//                             <Avatar.Image src={activeBookmark.avatar} alt={activeBookmark.name} />
//                           )}
//                           <Avatar.Fallback {...getBookmarkAvatarFallbackProps(activeBookmark.name)} />
//                         </Avatar>
//                         <div {...getBookmarkContentProps()}>
//                           <p {...getBookmarkNameProps(activeBookmark.name)} />
//                           {activeBookmark.url && (
//                             <p {...getBookmarkUrlProps(activeBookmark.url)} />
//                           )}
//                         </div>
//                       </div>
//                     )}
//                     {activeFolder && (
//                       <div {...getFolderTriggerProps()} style={{ opacity: 0.8, cursor: 'grabbing', backgroundColor: 'var(--default-100)', borderRadius: '0.5rem', padding: '0.5rem' }}>
//                         <div {...getFolderTriggerContentProps()}>
//                           <Icon {...getFolderIconProps()} />
//                           <span {...getFolderNameProps(activeFolder)} />
//                           <span {...getFolderCountProps(bookmarksByFolder[activeFolder].length)} />
//                         </div>
//                       </div>
//                     )}
//                   </DragOverlay>
//                 </DndContext>
//               </ScrollShadow>
//             </Drawer.Body>
//           </Drawer.Dialog>
//         </Drawer.Content>
//       </Drawer>
//     </Component>
//   )
// })
// BookmarksDrawer.displayName = 'BookmarksDrawer'
// export { BookmarksDrawer }

// import {
//   DndContext,
//   DragEndEvent,
//   DragOverlay,
//   DragStartEvent,
//   KeyboardSensor,
//   PointerSensor,
//   closestCenter,
//   defaultDropAnimationSideEffects,
//   useSensor,
//   useSensors
// } from '@dnd-kit/core'
// import {
//   SortableContext,
//   arrayMove,
//   horizontalListSortingStrategy,
//   rectSortingStrategy,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy
// } from '@dnd-kit/sortable'
// import { Icon } from '@iconify/react'
// import { useMemo, useState } from 'react'
// import React from 'react'

// import { forwardRef } from '@vezham/react-utils'
// import {
//   Accordion,
//   Avatar,
//   Button,
//   Drawer,
//   Input,
//   ScrollShadow
// } from '@vezham/react/v3'

// import { SortableBookmarkItem } from './SortableBookMarksItem'
// import { SortableFavoriteItem } from './SortableFavoriteItem'
// import { SortableFolderItem } from './SortableFolderItem'
// import { sampleBookmarks, sampleFavorites } from './data'
// import { BookmarkItem, FavoriteItem, Props, useProps } from './types'

// const BookmarksDrawer = forwardRef<'div', Props>((props, ref) => {
//   const {
//     Component,
//     getDrawerDialogProps,
//     getDrawerBodyProps,
//     getSearchContainerProps,
//     getSearchInputProps,
//     getScrollShadowProps,
//     getEmptyContainerProps,
//     getEmptyIconProps,
//     getEmptyTitleProps,
//     getEmptyDescriptionProps,
//     getContentContainerProps,
//     getSectionProps,
//     getSectionHeaderProps,
//     getSectionIconProps,
//     getSectionTitleProps,
//     getFavoritesGridProps,
//     getFavorites2GridProps,
//     getFavoriteItemProps,
//     getFavorite2ItemsProps,
//     getFavoriteBackgroundImageProps,
//     getFavoriteBackgroundGradientProps,
//     getFavoriteOverlayProps,
//     getFavoriteAvatarContainerProps,
//     getFavoriteAvatarProps,
//     getFavoriteAvatarIconProps,
//     getFavoriteAvatarFallbackProps,
//     getFavoriteContentProps,
//     getFavoriteNameProps,
//     getBookmarksListProps,
//     getBookmarkItemProps,
//     getBookmarkAvatarProps,
//     getBookmarkAvatarFallbackProps,
//     getBookmarkContentProps,
//     getBookmarkNameProps,
//     getBookmarkUrlProps,
//     getBookmarkDeleteButtonProps,
//     getFolderAccordionProps,
//     getFolderItemProps,
//     getFolderHeadingProps,
//     getFolderTriggerProps,
//     getFolderTriggerContentProps,
//     getFolderIconProps,
//     getFolderNameProps,
//     getFolderCountProps,
//     getFolderIndicatorProps,
//     getFolderPanelProps,
//     getFolderBodyProps,
//     isOpen,
//     onClose,
//     placement,
//     externalFavorites,
//     externalBookmarks,
//     onFavoriteClick,
//     onBookmarkClick,
//     onBookmarkDelete,
//     renderFavoriteItem,
//     renderBookmarkItem,
//     renderFolderItem,
//     onFavoritesReorder,
//     onBookmarksReorder,
//     onFolderReorder
//   } = useProps({
//     ...props,
//     ref
//   })

//   const [searchQuery, setSearchQuery] = useState('')
//   const [internalFavorites, setInternalFavorites] =
//     useState<FavoriteItem[]>(sampleFavorites)
//   const [internalBookmarks, setInternalBookmarks] =
//     useState<BookmarkItem[]>(sampleBookmarks)
//   const [hoveredBookmarkId, setHoveredBookmarkId] = useState<string | null>(
//     null
//   )
//   const [activeId, setActiveId] = useState<string | null>(null)
//   const [activeType, setActiveType] = useState<
//     'favorite' | 'bookmark' | 'folder' | null
//   >(null)

//   const favorites = externalFavorites || internalFavorites
//   const bookmarks = externalBookmarks || internalBookmarks

//   // Sensors for drag and drop
//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 8
//       }
//     }),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates
//     })
//   )

//   const filteredFavorites = favorites.filter(item =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   const filteredBookmarks = bookmarks.filter(item =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   const folderBookmarks = filteredBookmarks.filter(b => b.folder)
//   const singleBookmarks = filteredBookmarks.filter(b => !b.folder)

//   // Create a map of folders to their bookmarks
//   const bookmarksByFolder = useMemo(() => {
//     return folderBookmarks.reduce(
//       (acc, bookmark) => {
//         const folder = bookmark.folder!
//         if (!acc[folder]) {
//           acc[folder] = []
//         }
//         acc[folder].push(bookmark)
//         return acc
//       },
//       {} as Record<string, BookmarkItem[]>
//     )
//   }, [folderBookmarks])

//   // Get sorted folder names based on the actual order in bookmarks array
//   const folderNames = useMemo(() => {
//     const folders = Object.keys(bookmarksByFolder)
//     // Sort folders based on the order they appear in the original bookmarks array
//     return folders.sort((a, b) => {
//       const firstA = folderBookmarks.find(bm => bm.folder === a)
//       const firstB = folderBookmarks.find(bm => bm.folder === b)
//       if (!firstA || !firstB) return 0
//       return folderBookmarks.indexOf(firstA) - folderBookmarks.indexOf(firstB)
//     })
//   }, [bookmarksByFolder, folderBookmarks])

//   const hasFavorites = filteredFavorites.length > 0
//   const hasFolderBookmarks = folderNames.length > 0
//   const hasSingleBookmarks = singleBookmarks.length > 0
//   const hasBookmarks = hasFolderBookmarks || hasSingleBookmarks

//   // Drag and drop handlers
//   const handleDragStart = (event: DragStartEvent) => {
//     const { active } = event
//     setActiveId(active.id as string)

//     // Determine the type of item being dragged
//     if (filteredFavorites.some(f => f.id === active.id)) {
//       setActiveType('favorite')
//     } else if (singleBookmarks.some(b => b.id === active.id)) {
//       setActiveType('bookmark')
//     } else if (folderNames.includes(active.id as string)) {
//       setActiveType('folder')
//     }
//   }

//   const handleFavoriteDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event
//     setActiveId(null)
//     setActiveType(null)

//     if (active.id !== over?.id && over?.id) {
//       const oldIndex = filteredFavorites.findIndex(
//         item => item.id === active.id
//       )
//       const newIndex = filteredFavorites.findIndex(item => item.id === over.id)

//       if (oldIndex !== -1 && newIndex !== -1) {
//         const newFavorites = arrayMove(filteredFavorites, oldIndex, newIndex)

//         if (!externalFavorites) {
//           setInternalFavorites(newFavorites)
//         } else if (onFavoritesReorder) {
//           onFavoritesReorder(newFavorites)
//         }
//       }
//     }
//   }

//   const handleBookmarkDragEnd = (
//     event: DragEndEvent,
//     bookmarkList: BookmarkItem[],
//     isSingleBookmark: boolean
//   ) => {
//     const { active, over } = event
//     setActiveId(null)
//     setActiveType(null)

//     if (active.id !== over?.id && over?.id) {
//       const oldIndex = bookmarkList.findIndex(item => item.id === active.id)
//       const newIndex = bookmarkList.findIndex(item => item.id === over.id)

//       if (oldIndex !== -1 && newIndex !== -1) {
//         const newBookmarkList = arrayMove(bookmarkList, oldIndex, newIndex)

//         if (isSingleBookmark) {
//           // Update single bookmarks while preserving folder bookmarks
//           const otherBookmarks = bookmarks.filter(b => b.folder)
//           const finalBookmarks = [...newBookmarkList, ...otherBookmarks]

//           if (!externalBookmarks) {
//             setInternalBookmarks(finalBookmarks)
//           } else if (onBookmarksReorder) {
//             onBookmarksReorder(finalBookmarks)
//           }
//         } else {
//           // Update folder bookmarks - preserve the folder structure
//           const otherBookmarks = bookmarks.filter(b => !b.folder)
//           const finalBookmarks = [...otherBookmarks, ...newBookmarkList]

//           if (!externalBookmarks) {
//             setInternalBookmarks(finalBookmarks)
//           } else if (onBookmarksReorder) {
//             onBookmarksReorder(finalBookmarks)
//           }
//         }
//       }
//     }
//   }

//   const handleFolderDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event
//     setActiveId(null)
//     setActiveType(null)

//     if (active.id !== over?.id && over?.id) {
//       const oldIndex = folderNames.findIndex(folder => folder === active.id)
//       const newIndex = folderNames.findIndex(folder => folder === over.id)

//       if (oldIndex !== -1 && newIndex !== -1) {
//         // Get all bookmarks that are not in folders
//         const nonFolderBookmarks = bookmarks.filter(b => !b.folder)

//         // Create a new array with reordered folders
//         const reorderedFolders = arrayMove(folderNames, oldIndex, newIndex)

//         // Rebuild the bookmarks array with new folder order
//         const newBookmarks: BookmarkItem[] = [...nonFolderBookmarks]

//         reorderedFolders.forEach(folder => {
//           newBookmarks.push(...bookmarksByFolder[folder])
//         })

//         if (!externalBookmarks) {
//           setInternalBookmarks(newBookmarks)
//         } else if (onFolderReorder) {
//           onFolderReorder(newBookmarks)
//         }
//       }
//     }
//   }

//   const handleItemClick = (url: string, item?: FavoriteItem | BookmarkItem) => {
//     if (url && url !== '#') {
//       window.open(url.startsWith('http') ? url : `https://${url}`, '_blank')
//     }
//   }

//   const handleFavoriteClick = (url: string, item: FavoriteItem) => {
//     if (onFavoriteClick) {
//       onFavoriteClick(url, item)
//     } else {
//       handleItemClick(url, item)
//     }
//   }

//   const handleBookmarkClick = (url: string, item: BookmarkItem) => {
//     if (onBookmarkClick) {
//       onBookmarkClick(url, item)
//     } else {
//       handleItemClick(url, item)
//     }
//   }

//   const handleBookmarkDelete = (item: BookmarkItem, e: React.MouseEvent) => {
//     e.stopPropagation()
//     if (onBookmarkDelete) {
//       onBookmarkDelete(item.id, item)
//     } else {
//       setInternalBookmarks(prev => prev.filter(b => b.id !== item.id))
//     }
//   }

//   const handleFolderBookmarkDragEnd = (
//     event: DragEndEvent,
//     folderName: string
//   ) => {
//     const { active, over } = event
//     if (active.id !== over?.id && over?.id) {
//       const folderItems = bookmarksByFolder[folderName]
//       const oldIndex = folderItems.findIndex(item => item.id === active.id)
//       const newIndex = folderItems.findIndex(item => item.id === over.id)

//       if (oldIndex !== -1 && newIndex !== -1) {
//         const reorderedFolderItems = arrayMove(folderItems, oldIndex, newIndex)

//         // Rebuild the entire bookmarks array
//         const nonFolderBookmarks = bookmarks.filter(b => !b.folder)
//         const newBookmarks: BookmarkItem[] = [...nonFolderBookmarks]

//         folderNames.forEach(folder => {
//           if (folder === folderName) {
//             newBookmarks.push(...reorderedFolderItems)
//           } else {
//             newBookmarks.push(...bookmarksByFolder[folder])
//           }
//         })

//         if (!externalBookmarks) {
//           setInternalBookmarks(newBookmarks)
//         } else if (onBookmarksReorder) {
//           onBookmarksReorder(newBookmarks)
//         }
//       }
//     }
//   }

//   const renderFavoriteItemsForGrid1 = () => {
//     if (renderFavoriteItem) {
//       return filteredFavorites.map(item => (
//         <React.Fragment key={item.id}>
//           {renderFavoriteItem({
//             item,
//             onItemClick: url => handleFavoriteClick(url, item)
//           })}
//         </React.Fragment>
//       ))
//     }

//     return (
//       <SortableContext
//         items={filteredFavorites.map(f => f.id)}
//         strategy={rectSortingStrategy}>
//         {filteredFavorites.map(item => (
//           <SortableFavoriteItem
//             key={item.id}
//             id={item.id}
//             item={item}
//             getFavoriteItemProps={getFavoriteItemProps}
//             getFavoriteBackgroundImageProps={getFavoriteBackgroundImageProps}
//             getFavoriteBackgroundGradientProps={
//               getFavoriteBackgroundGradientProps
//             }
//             getFavoriteOverlayProps={getFavoriteOverlayProps}
//             getFavoriteAvatarContainerProps={getFavoriteAvatarContainerProps}
//             getFavoriteAvatarProps={getFavoriteAvatarProps}
//             getFavoriteAvatarIconProps={getFavoriteAvatarIconProps}
//             getFavoriteAvatarFallbackProps={getFavoriteAvatarFallbackProps}
//             getFavoriteContentProps={getFavoriteContentProps}
//             getFavoriteNameProps={getFavoriteNameProps}
//             onClick={() => handleFavoriteClick(item.url, item)}
//           />
//         ))}
//       </SortableContext>
//     )
//   }

//   const renderFavoriteItemsForGrid2 = () => {
//     if (renderFavoriteItem) {
//       return filteredFavorites.map(item => (
//         <React.Fragment key={item.id}>
//           {renderFavoriteItem({
//             item,
//             onItemClick: url => handleFavoriteClick(url, item)
//           })}
//         </React.Fragment>
//       ))
//     }

//     return (
//       <SortableContext
//         items={filteredFavorites.map(f => f.id)}
//         strategy={horizontalListSortingStrategy}>
//         {filteredFavorites.map(item => (
//           <SortableFavoriteItem
//             key={item.id}
//             id={item.id}
//             item={item}
//             getFavoriteItemProps={getFavorite2ItemsProps}
//             getFavoriteBackgroundImageProps={getFavoriteBackgroundImageProps}
//             getFavoriteBackgroundGradientProps={
//               getFavoriteBackgroundGradientProps
//             }
//             getFavoriteOverlayProps={getFavoriteOverlayProps}
//             getFavoriteAvatarContainerProps={getFavoriteAvatarContainerProps}
//             getFavoriteAvatarProps={getFavoriteAvatarProps}
//             getFavoriteAvatarIconProps={getFavoriteAvatarIconProps}
//             getFavoriteAvatarFallbackProps={getFavoriteAvatarFallbackProps}
//             getFavoriteContentProps={getFavoriteContentProps}
//             getFavoriteNameProps={getFavoriteNameProps}
//             onClick={() => handleFavoriteClick(item.url, item)}
//           />
//         ))}
//       </SortableContext>
//     )
//   }

//   const renderBookmarkItems = (
//     items: BookmarkItem[],
//     isFolderContent: boolean,
//     folderName?: string
//   ) => {
//     if (renderBookmarkItem) {
//       return items.map(item => (
//         <React.Fragment key={item.id}>
//           {renderBookmarkItem({
//             item,
//             onItemClick: url => handleBookmarkClick(url, item)
//           })}
//         </React.Fragment>
//       ))
//     }

//     const handleDragEnd =
//       isFolderContent && folderName
//         ? (event: DragEndEvent) =>
//             handleFolderBookmarkDragEnd(event, folderName)
//         : (event: DragEndEvent) =>
//             handleBookmarkDragEnd(event, items, !isFolderContent)

//     return (
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}>
//         <SortableContext
//           items={items.map(b => b.id)}
//           strategy={verticalListSortingStrategy}>
//           {items.map(bookmark => (
//             <SortableBookmarkItem
//               key={bookmark.id}
//               id={bookmark.id}
//               item={bookmark}
//               getBookmarkItemProps={getBookmarkItemProps}
//               getBookmarkAvatarProps={getBookmarkAvatarProps}
//               getBookmarkAvatarFallbackProps={getBookmarkAvatarFallbackProps}
//               getBookmarkContentProps={getBookmarkContentProps}
//               getBookmarkNameProps={getBookmarkNameProps}
//               getBookmarkUrlProps={getBookmarkUrlProps}
//               getBookmarkDeleteButtonProps={getBookmarkDeleteButtonProps}
//               onClick={() => handleBookmarkClick(bookmark.url, bookmark)}
//               onDelete={e => handleBookmarkDelete(bookmark, e)}
//               isHovered={hoveredBookmarkId === bookmark.id}
//               onMouseEnter={() => setHoveredBookmarkId(bookmark.id)}
//               onMouseLeave={() => setHoveredBookmarkId(null)}
//             />
//           ))}
//         </SortableContext>
//       </DndContext>
//     )
//   }

//   const renderFolderBookmarks = () => {
//     if (renderFolderItem) {
//       return folderNames.map(folder => (
//         <React.Fragment key={folder}>
//           {renderFolderItem(folder, bookmarksByFolder[folder], url =>
//             handleBookmarkClick(url, bookmarksByFolder[folder][0])
//           )}
//         </React.Fragment>
//       ))
//     }

//     return (
//       <SortableContext
//         items={folderNames}
//         strategy={verticalListSortingStrategy}>
//         {folderNames.map(folder => (
//           <SortableFolderItem
//             key={folder}
//             id={folder}
//             folder={folder}
//             items={bookmarksByFolder[folder]}
//             getFolderAccordionProps={getFolderAccordionProps}
//             getFolderItemProps={getFolderItemProps}
//             getFolderHeadingProps={getFolderHeadingProps}
//             getFolderTriggerProps={getFolderTriggerProps}
//             getFolderTriggerContentProps={getFolderTriggerContentProps}
//             getFolderIconProps={getFolderIconProps}
//             getFolderNameProps={getFolderNameProps}
//             getFolderCountProps={getFolderCountProps}
//             getFolderIndicatorProps={getFolderIndicatorProps}
//             getFolderPanelProps={getFolderPanelProps}
//             getFolderBodyProps={getFolderBodyProps}
//             renderBookmarkItems={(items, isFolderContent) =>
//               renderBookmarkItems(items, true, folder)
//             }
//           />
//         ))}
//       </SortableContext>
//     )
//   }

//   const getDragEndHandler = () => {
//     return (event: DragEndEvent) => {
//       const { active } = event

//       if (activeType === 'favorite') {
//         handleFavoriteDragEnd(event)
//       } else if (activeType === 'bookmark') {
//         handleBookmarkDragEnd(event, singleBookmarks, true)
//       } else if (activeType === 'folder') {
//         handleFolderDragEnd(event)
//       }

//       setActiveId(null)
//       setActiveType(null)
//     }
//   }

//   const activeFavorite =
//     activeId && activeType === 'favorite'
//       ? filteredFavorites.find(f => f.id === activeId)
//       : null
//   const activeBookmark =
//     activeId && activeType === 'bookmark'
//       ? singleBookmarks.find(b => b.id === activeId)
//       : null
//   const activeFolder =
//     activeId && activeType === 'folder'
//       ? folderNames.find(f => f === activeId)
//       : null

//   return (
//     <Component>
//       <Drawer isOpen={isOpen} onOpenChange={onClose}>
//         <Drawer.Content placement={placement}>
//           <Drawer.Dialog {...getDrawerDialogProps()}>
//             <Drawer.CloseTrigger />
//             <Drawer.Header>
//               <div {...getSearchContainerProps()}>
//                 <Input
//                   {...getSearchInputProps()}
//                   value={searchQuery}
//                   onChange={e => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </Drawer.Header>

//             <Drawer.Body {...getDrawerBodyProps()}>
//               <ScrollShadow {...getScrollShadowProps()}>
//                 <DndContext
//                   sensors={sensors}
//                   collisionDetection={closestCenter}
//                   onDragStart={handleDragStart}
//                   onDragEnd={getDragEndHandler()}>
//                   {!hasFavorites && !hasBookmarks ? (
//                     <div {...getEmptyContainerProps()}>
//                       <Icon {...getEmptyIconProps()} />
//                       <h2 {...getEmptyTitleProps()} />
//                       <p {...getEmptyDescriptionProps()} />
//                     </div>
//                   ) : (
//                     <div {...getContentContainerProps()}>
//                       {hasFavorites && (
//                         <>
//                           {/* Grid 1: Flex Wrap (Multiple Rows) */}
//                           <section {...getSectionProps()}>
//                             <div {...getSectionHeaderProps()}>
//                               <Icon
//                                 {...getSectionIconProps(
//                                   'solar:star-bold',
//                                   'text-warning'
//                                 )}
//                               />
//                               <h3
//                                 {...getSectionTitleProps('Favorites (Grid)')}
//                               />
//                             </div>
//                             <div {...getFavoritesGridProps()}>
//                               {renderFavoriteItemsForGrid1()}
//                             </div>
//                           </section>

//                           {/* Grid 2: Horizontal Scroll (Single Row) */}
//                           <section {...getSectionProps()}>
//                             <div {...getSectionHeaderProps()}>
//                               <Icon
//                                 {...getSectionIconProps(
//                                   'solar:star-bold',
//                                   'text-warning'
//                                 )}
//                               />
//                               <h3
//                                 {...getSectionTitleProps('Favorites (Scroll)')}
//                               />
//                             </div>
//                             <div {...getFavorites2GridProps()}>
//                               {renderFavoriteItemsForGrid2()}
//                             </div>
//                           </section>
//                         </>
//                       )}

//                       {hasSingleBookmarks && (
//                         <section {...getSectionProps()}>
//                           <div {...getSectionHeaderProps()}>
//                             <Icon
//                               {...getSectionIconProps(
//                                 'solar:bookmark-bold',
//                                 'text-primary'
//                               )}
//                             />
//                             <h3 {...getSectionTitleProps('Bookmarks')} />
//                           </div>
//                           <div {...getBookmarksListProps()}>
//                             {renderBookmarkItems(singleBookmarks, false)}
//                           </div>
//                         </section>
//                       )}

//                       {hasFolderBookmarks && (
//                         <section {...getSectionProps()}>
//                           {renderFolderBookmarks()}
//                         </section>
//                       )}
//                     </div>
//                   )}

//                   <DragOverlay
//                     dropAnimation={{
//                       sideEffects: defaultDropAnimationSideEffects({
//                         styles: {
//                           active: {
//                             opacity: '0.4'
//                           }
//                         }
//                       })
//                     }}>
//                     {activeFavorite && (
//                       <div
//                         {...getFavoriteItemProps()}
//                         style={{ opacity: 0.8, cursor: 'grabbing' }}>
//                         {activeFavorite.backgroundImage ? (
//                           <img
//                             {...getFavoriteBackgroundImageProps(
//                               activeFavorite.backgroundImage,
//                               activeFavorite.name
//                             )}
//                           />
//                         ) : (
//                           <div {...getFavoriteBackgroundGradientProps()} />
//                         )}
//                         <div {...getFavoriteOverlayProps()} />
//                         <div {...getFavoriteAvatarContainerProps()}>
//                           <Avatar {...getFavoriteAvatarProps()}>
//                             {activeFavorite.avatar && (
//                               <Avatar.Image
//                                 src={activeFavorite.avatar}
//                                 alt={activeFavorite.name}
//                               />
//                             )}
//                             <Avatar.Fallback
//                               {...getFavoriteAvatarFallbackProps(
//                                 activeFavorite.name
//                               )}>
//                               <Icon {...getFavoriteAvatarIconProps()} />
//                             </Avatar.Fallback>
//                           </Avatar>
//                         </div>
//                         <div {...getFavoriteContentProps()}>
//                           <p {...getFavoriteNameProps(activeFavorite.name)} />
//                         </div>
//                       </div>
//                     )}

//                     {activeBookmark && (
//                       <div
//                         {...getBookmarkItemProps()}
//                         style={{
//                           opacity: 0.8,
//                           cursor: 'grabbing',
//                           backgroundColor: 'var(--default-100)',
//                           borderRadius: '0.5rem',
//                           padding: '0.5rem 0.75rem'
//                         }}>
//                         <Avatar {...getBookmarkAvatarProps()}>
//                           {activeBookmark.avatar && (
//                             <Avatar.Image
//                               src={activeBookmark.avatar}
//                               alt={activeBookmark.name}
//                             />
//                           )}
//                           <Avatar.Fallback
//                             {...getBookmarkAvatarFallbackProps(
//                               activeBookmark.name
//                             )}
//                           />
//                         </Avatar>
//                         <div {...getBookmarkContentProps()}>
//                           <p {...getBookmarkNameProps(activeBookmark.name)} />
//                           {activeBookmark.url && (
//                             <p {...getBookmarkUrlProps(activeBookmark.url)} />
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {activeFolder && (
//                       <div
//                         {...getFolderTriggerProps()}
//                         style={{
//                           opacity: 0.8,
//                           cursor: 'grabbing',
//                           backgroundColor: 'var(--default-100)',
//                           borderRadius: '0.5rem',
//                           padding: '0.5rem'
//                         }}>
//                         <div {...getFolderTriggerContentProps()}>
//                           <Icon {...getFolderIconProps()} />
//                           <span {...getFolderNameProps(activeFolder)} />
//                           <span
//                             {...getFolderCountProps(
//                               bookmarksByFolder[activeFolder].length
//                             )}
//                           />
//                         </div>
//                       </div>
//                     )}
//                   </DragOverlay>
//                 </DndContext>
//               </ScrollShadow>
//             </Drawer.Body>
//           </Drawer.Dialog>
//         </Drawer.Content>
//       </Drawer>
//     </Component>
//   )
// })

// BookmarksDrawer.displayName = 'BookmarksDrawer'

// export { BookmarksDrawer }

// 'use client'
// import { Icon } from '@iconify/react'
// import { useState } from 'react'
// import React from 'react'
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragEndEvent,
//   DragStartEvent,
//   DragOverlay,
//   defaultDropAnimationSideEffects,
// } from '@dnd-kit/core'
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   rectSortingStrategy,
//   verticalListSortingStrategy,
//   horizontalListSortingStrategy,
// } from '@dnd-kit/sortable'
// import { forwardRef } from '@vezham/react-utils'
// import {
//   Accordion,
//   Avatar,
//   Button,
//   Drawer,
//   Input,
//   ScrollShadow
// } from '@vezham/react/v3'
// import { sampleBookmarks, sampleFavorites } from './data'
// import { BookmarkItem, FavoriteItem, Props, useProps } from './types'
// import { SortableFavoriteItem } from './SortableFavoriteItem'
// import { SortableBookmarkItem } from './SortableBookMarksItem'
// import { SortableFolderItem } from './SortableFolderItem'
// const BookmarksDrawer = forwardRef<'div', Props>((props, ref) => {
//   const {
//     Component,
//     getDrawerDialogProps,
//     getDrawerBodyProps,
//     getSearchContainerProps,
//     getSearchInputProps,
//     getScrollShadowProps,
//     getEmptyContainerProps,
//     getEmptyIconProps,
//     getEmptyTitleProps,
//     getEmptyDescriptionProps,
//     getContentContainerProps,
//     getSectionProps,
//     getSectionHeaderProps,
//     getSectionIconProps,
//     getSectionTitleProps,
//     getFavoritesGridProps,
//     getFavorites2GridProps,
//     getFavoriteItemProps,
//     getFavorite2ItemsProps,
//     getFavoriteBackgroundImageProps,
//     getFavoriteBackgroundGradientProps,
//     getFavoriteOverlayProps,
//     getFavoriteAvatarContainerProps,
//     getFavoriteAvatarProps,
//     getFavoriteAvatarIconProps,
//     getFavoriteAvatarFallbackProps,
//     getFavoriteContentProps,
//     getFavoriteNameProps,
//     getBookmarksListProps,
//     getBookmarkItemProps,
//     getBookmarkAvatarProps,
//     getBookmarkAvatarFallbackProps,
//     getBookmarkContentProps,
//     getBookmarkNameProps,
//     getBookmarkUrlProps,
//     getBookmarkDeleteButtonProps,
//     getFolderAccordionProps,
//     getFolderItemProps,
//     getFolderHeadingProps,
//     getFolderTriggerProps,
//     getFolderTriggerContentProps,
//     getFolderIconProps,
//     getFolderNameProps,
//     getFolderCountProps,
//     getFolderIndicatorProps,
//     getFolderPanelProps,
//     getFolderBodyProps,
//     isOpen,
//     onClose,
//     placement,
//     externalFavorites,
//     externalBookmarks,
//     onFavoriteClick,
//     onBookmarkClick,
//     onBookmarkDelete,
//     renderFavoriteItem,
//     renderBookmarkItem,
//     renderFolderItem,
//     onFavoritesReorder,
//     onBookmarksReorder,
//     onFolderReorder
//   } = useProps({
//     ...props,
//     ref
//   })
//   const [searchQuery, setSearchQuery] = useState('')
//   const [internalFavorites, setInternalFavorites] =
//     useState<FavoriteItem[]>(sampleFavorites)
//   const [internalBookmarks, setInternalBookmarks] =
//     useState<BookmarkItem[]>(sampleBookmarks)
//   const [hoveredBookmarkId, setHoveredBookmarkId] = useState<string | null>(
//     null
//   )
//   const [activeId, setActiveId] = useState<string | null>(null)
//   const [activeType, setActiveType] = useState<'favorite' | 'bookmark' | 'folder' | null>(null)
//   const favorites = externalFavorites || internalFavorites
//   const bookmarks = externalBookmarks || internalBookmarks
//   // Sensors for drag and drop
//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 8,
//       },
//     }),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   )
//   const filteredFavorites = favorites.filter(item =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   )
//   const filteredBookmarks = bookmarks.filter(item =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   )
//   const folderBookmarks = filteredBookmarks.filter(b => b.folder)
//   const singleBookmarks = filteredBookmarks.filter(b => !b.folder)
//   const bookmarksByFolder = folderBookmarks.reduce(
//     (acc, bookmark) => {
//       const folder = bookmark.folder!
//       if (!acc[folder]) {
//         acc[folder] = []
//       }
//       acc[folder].push(bookmark)
//       return acc
//     },
//     {} as Record<string, BookmarkItem[]>
//   )
//   const folderNames = Object.keys(bookmarksByFolder).sort()
//   const hasFavorites = filteredFavorites.length > 0
//   const hasFolderBookmarks = folderNames.length > 0
//   const hasSingleBookmarks = singleBookmarks.length > 0
//   const hasBookmarks = hasFolderBookmarks || hasSingleBookmarks
//   // Drag and drop handlers
//   const handleDragStart = (event: DragStartEvent) => {
//     const { active } = event
//     setActiveId(active.id as string)
//     // Determine the type of item being dragged
//     if (filteredFavorites.some(f => f.id === active.id)) {
//       setActiveType('favorite')
//     } else if (singleBookmarks.some(b => b.id === active.id)) {
//       setActiveType('bookmark')
//     } else if (folderNames.includes(active.id as string)) {
//       setActiveType('folder')
//     }
//   }
//   const handleFavoriteDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event
//     setActiveId(null)
//     setActiveType(null)
//     if (active.id !== over?.id) {
//       const oldIndex = filteredFavorites.findIndex((item) => item.id === active.id)
//       const newIndex = filteredFavorites.findIndex((item) => item.id === over?.id)
//       if (oldIndex !== -1 && newIndex !== -1) {
//         const newFavorites = arrayMove(filteredFavorites, oldIndex, newIndex)
//         if (!externalFavorites) {
//           setInternalFavorites(newFavorites)
//         } else if (onFavoritesReorder) {
//           onFavoritesReorder(newFavorites)
//         }
//       }
//     }
//   }
//   const handleBookmarkDragEnd = (event: DragEndEvent, bookmarkList: BookmarkItem[], isSingleBookmark: boolean = true) => {
//     const { active, over } = event
//     setActiveId(null)
//     setActiveType(null)
//     if (active.id !== over?.id) {
//       const oldIndex = bookmarkList.findIndex((item) => item.id === active.id)
//       const newIndex = bookmarkList.findIndex((item) => item.id === over?.id)
//       if (oldIndex !== -1 && newIndex !== -1) {
//         const newBookmarkList = arrayMove(bookmarkList, oldIndex, newIndex)
//         if (isSingleBookmark) {
//           // Update single bookmarks while preserving folder bookmarks
//           const otherBookmarks = bookmarks.filter(b => b.folder)
//           const finalBookmarks = [...newBookmarkList, ...otherBookmarks]
//           if (!externalBookmarks) {
//             setInternalBookmarks(finalBookmarks)
//           } else if (onBookmarksReorder) {
//             onBookmarksReorder(finalBookmarks)
//           }
//         } else {
//           // Update folder bookmarks
//           const otherBookmarks = bookmarks.filter(b => !b.folder)
//           const finalBookmarks = [...otherBookmarks, ...newBookmarkList]
//           if (!externalBookmarks) {
//             setInternalBookmarks(finalBookmarks)
//           } else if (onBookmarksReorder) {
//             onBookmarksReorder(finalBookmarks)
//           }
//         }
//       }
//     }
//   }
//   const handleFolderDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event
//     setActiveId(null)
//     setActiveType(null)
//     if (active.id !== over?.id) {
//       const oldIndex = folderNames.findIndex((folder) => folder === active.id)
//       const newIndex = folderNames.findIndex((folder) => folder === over?.id)
//       if (oldIndex !== -1 && newIndex !== -1) {
//         const newFolderNames = arrayMove(folderNames, oldIndex, newIndex)
//         // Reorganize bookmarks based on new folder order
//         const newBookmarks: BookmarkItem[] = []
//         // Add single bookmarks first
//         newBookmarks.push(...singleBookmarks)
//         // Add folder bookmarks in new order
//         newFolderNames.forEach(folder => {
//           newBookmarks.push(...bookmarksByFolder[folder])
//         })
//         if (!externalBookmarks) {
//           setInternalBookmarks(newBookmarks)
//         } else if (onFolderReorder) {
//           onFolderReorder(newBookmarks)
//         }
//       }
//     }
//   }
//   const handleItemClick = (url: string, item?: FavoriteItem | BookmarkItem) => {
//     if (url && url !== '#') {
//       window.open(url.startsWith('http') ? url : `https://${url}`, '_blank')
//     }
//   }
//   const handleFavoriteClick = (url: string, item: FavoriteItem) => {
//     if (onFavoriteClick) {
//       onFavoriteClick(url, item)
//     } else {
//       handleItemClick(url, item)
//     }
//   }
//   const handleBookmarkClick = (url: string, item: BookmarkItem) => {
//     if (onBookmarkClick) {
//       onBookmarkClick(url, item)
//     } else {
//       handleItemClick(url, item)
//     }
//   }
//   const handleBookmarkDelete = (item: BookmarkItem, e: React.MouseEvent) => {
//     e.stopPropagation()
//     if (onBookmarkDelete) {
//       onBookmarkDelete(item.id, item)
//     } else {
//       setInternalBookmarks(prev => prev.filter(b => b.id !== item.id))
//     }
//   }
//   const renderFavoriteItemsForGrid1 = () => {
//     if (renderFavoriteItem) {
//       return filteredFavorites.map(item => (
//         <React.Fragment key={item.id}>
//           {renderFavoriteItem({
//             item,
//             onItemClick: url => handleFavoriteClick(url, item)
//           })}
//         </React.Fragment>
//       ))
//     }
//     return (
//       <SortableContext items={filteredFavorites.map(f => f.id)} strategy={rectSortingStrategy}>
//         {filteredFavorites.map(item => (
//           <SortableFavoriteItem
//             key={item.id}
//             id={item.id}
//             item={item}
//             getFavoriteItemProps={getFavoriteItemProps}
//             getFavoriteBackgroundImageProps={getFavoriteBackgroundImageProps}
//             getFavoriteBackgroundGradientProps={getFavoriteBackgroundGradientProps}
//             getFavoriteOverlayProps={getFavoriteOverlayProps}
//             getFavoriteAvatarContainerProps={getFavoriteAvatarContainerProps}
//             getFavoriteAvatarProps={getFavoriteAvatarProps}
//             getFavoriteAvatarIconProps={getFavoriteAvatarIconProps}
//             getFavoriteAvatarFallbackProps={getFavoriteAvatarFallbackProps}
//             getFavoriteContentProps={getFavoriteContentProps}
//             getFavoriteNameProps={getFavoriteNameProps}
//             onClick={() => handleFavoriteClick(item.url, item)}
//           />
//         ))}
//       </SortableContext>
//     )
//   }
//   const renderFavoriteItemsForGrid2 = () => {
//     if (renderFavoriteItem) {
//       return filteredFavorites.map(item => (
//         <React.Fragment key={item.id}>
//           {renderFavoriteItem({
//             item,
//             onItemClick: url => handleFavoriteClick(url, item)
//           })}
//         </React.Fragment>
//       ))
//     }
//     return (
//       <SortableContext items={filteredFavorites.map(f => f.id)} strategy={horizontalListSortingStrategy}>
//         {filteredFavorites.map(item => (
//           <SortableFavoriteItem
//             key={item.id}
//             id={item.id}
//             item={item}
//             getFavoriteItemProps={getFavorite2ItemsProps}
//             getFavoriteBackgroundImageProps={getFavoriteBackgroundImageProps}
//             getFavoriteBackgroundGradientProps={getFavoriteBackgroundGradientProps}
//             getFavoriteOverlayProps={getFavoriteOverlayProps}
//             getFavoriteAvatarContainerProps={getFavoriteAvatarContainerProps}
//             getFavoriteAvatarProps={getFavoriteAvatarProps}
//             getFavoriteAvatarIconProps={getFavoriteAvatarIconProps}
//             getFavoriteAvatarFallbackProps={getFavoriteAvatarFallbackProps}
//             getFavoriteContentProps={getFavoriteContentProps}
//             getFavoriteNameProps={getFavoriteNameProps}
//             onClick={() => handleFavoriteClick(item.url, item)}
//           />
//         ))}
//       </SortableContext>
//     )
//   }
//   const renderBookmarkItems = (items: BookmarkItem[], isFolderContent: boolean = false) => {
//     if (renderBookmarkItem) {
//       return items.map(item => (
//         <React.Fragment key={item.id}>
//           {renderBookmarkItem({
//             item,
//             onItemClick: url => handleBookmarkClick(url, item)
//           })}
//         </React.Fragment>
//       ))
//     }
//     return (
//       <SortableContext items={items.map(b => b.id)} strategy={verticalListSortingStrategy}>
//         {items.map(bookmark => (
//           <SortableBookmarkItem
//             key={bookmark.id}
//             id={bookmark.id}
//             item={bookmark}
//             getBookmarkItemProps={getBookmarkItemProps}
//             getBookmarkAvatarProps={getBookmarkAvatarProps}
//             getBookmarkAvatarFallbackProps={getBookmarkAvatarFallbackProps}
//             getBookmarkContentProps={getBookmarkContentProps}
//             getBookmarkNameProps={getBookmarkNameProps}
//             getBookmarkUrlProps={getBookmarkUrlProps}
//             getBookmarkDeleteButtonProps={getBookmarkDeleteButtonProps}
//             onClick={() => handleBookmarkClick(bookmark.url, bookmark)}
//             onDelete={(e) => handleBookmarkDelete(bookmark, e)}
//             isHovered={hoveredBookmarkId === bookmark.id}
//             onMouseEnter={() => setHoveredBookmarkId(bookmark.id)}
//             onMouseLeave={() => setHoveredBookmarkId(null)}
//           />
//         ))}
//       </SortableContext>
//     )
//   }
//   const renderFolderBookmarks = () => {
//     if (renderFolderItem) {
//       return folderNames.map(folder => (
//         <React.Fragment key={folder}>
//           {renderFolderItem(folder, bookmarksByFolder[folder], url =>
//             handleBookmarkClick(url, bookmarksByFolder[folder][0])
//           )}
//         </React.Fragment>
//       ))
//     }
//     return (
//       <SortableContext items={folderNames} strategy={verticalListSortingStrategy}>
//         {folderNames.map(folder => (
//           <SortableFolderItem
//             key={folder}
//             id={folder}
//             folder={folder}
//             items={bookmarksByFolder[folder]}
//             getFolderAccordionProps={getFolderAccordionProps}
//             getFolderItemProps={getFolderItemProps}
//             getFolderHeadingProps={getFolderHeadingProps}
//             getFolderTriggerProps={getFolderTriggerProps}
//             getFolderTriggerContentProps={getFolderTriggerContentProps}
//             getFolderIconProps={getFolderIconProps}
//             getFolderNameProps={getFolderNameProps}
//             getFolderCountProps={getFolderCountProps}
//             getFolderIndicatorProps={getFolderIndicatorProps}
//             getFolderPanelProps={getFolderPanelProps}
//             getFolderBodyProps={getFolderBodyProps}
//             renderBookmarkItems={renderBookmarkItems}
//           />
//         ))}
//       </SortableContext>
//     )
//   }
//   const getDragEndHandler = () => {
//     return (event: DragEndEvent) => {
//       const { active } = event
//       if (activeType === 'favorite') {
//         handleFavoriteDragEnd(event)
//       } else if (activeType === 'bookmark') {
//         handleBookmarkDragEnd(event, singleBookmarks, true)
//       } else if (activeType === 'folder') {
//         handleFolderDragEnd(event)
//       }
//       setActiveId(null)
//       setActiveType(null)
//     }
//   }
//   const activeFavorite = activeId && activeType === 'favorite' ? filteredFavorites.find(f => f.id === activeId) : null
//   const activeBookmark = activeId && activeType === 'bookmark' ? singleBookmarks.find(b => b.id === activeId) : null
//   const activeFolder = activeId && activeType === 'folder' ? folderNames.find(f => f === activeId) : null
//   return (
//     <Component>
//       <Drawer isOpen={isOpen} onOpenChange={onClose}>
//         <Drawer.Content placement={placement}>
//           <Drawer.Dialog {...getDrawerDialogProps()}>
//             <Drawer.CloseTrigger />
//             <Drawer.Header>
//               <div {...getSearchContainerProps()}>
//                 <Input
//                   {...getSearchInputProps()}
//                   value={searchQuery}
//                   onChange={e => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </Drawer.Header>
//             <Drawer.Body {...getDrawerBodyProps()}>
//               <ScrollShadow {...getScrollShadowProps()}>
//                 <DndContext
//                   sensors={sensors}
//                   collisionDetection={closestCenter}
//                   onDragStart={handleDragStart}
//                   onDragEnd={getDragEndHandler()}
//                 >
//                   {!hasFavorites && !hasBookmarks ? (
//                     <div {...getEmptyContainerProps()}>
//                       <Icon {...getEmptyIconProps()} />
//                       <h2 {...getEmptyTitleProps()} />
//                       <p {...getEmptyDescriptionProps()} />
//                     </div>
//                   ) : (
//                     <div {...getContentContainerProps()}>
//                       {hasFavorites && (
//                         <>
//                           {/* Grid 1: Flex Wrap (Multiple Rows) */}
//                           <section {...getSectionProps()}>
//                             <div {...getSectionHeaderProps()}>
//                               <Icon
//                                 {...getSectionIconProps(
//                                   'solar:star-bold',
//                                   'text-warning'
//                                 )}
//                               />
//                               <h3 {...getSectionTitleProps('Favorites (Grid)')} />
//                               <span className="ml-auto text-xs text-default-400">Drag to reorder</span>
//                             </div>
//                             <div {...getFavoritesGridProps()}>
//                               {renderFavoriteItemsForGrid1()}
//                             </div>
//                           </section>
//                           {/* Grid 2: Horizontal Scroll (Single Row) */}
//                           <section {...getSectionProps()}>
//                             <div {...getSectionHeaderProps()}>
//                               <Icon
//                                 {...getSectionIconProps(
//                                   'solar:star-bold',
//                                   'text-warning'
//                                 )}
//                               />
//                               <h3
//                                 {...getSectionTitleProps('Favorites (Scroll)')}
//                               />
//                               <span className="ml-auto text-xs text-default-400">Drag to reorder</span>
//                             </div>
//                             <div {...getFavorites2GridProps()}>
//                               {renderFavoriteItemsForGrid2()}
//                             </div>
//                           </section>
//                         </>
//                       )}
//                       {hasSingleBookmarks && (
//                         <section {...getSectionProps()}>
//                           <div {...getSectionHeaderProps()}>
//                             <Icon
//                               {...getSectionIconProps(
//                                 'solar:bookmark-bold',
//                                 'text-primary'
//                               )}
//                             />
//                             <h3 {...getSectionTitleProps('Bookmarks')} />
//                             <span className="ml-auto text-xs text-default-400">Drag to reorder</span>
//                           </div>
//                           <div {...getBookmarksListProps()}>
//                             {renderBookmarkItems(singleBookmarks, false)}
//                           </div>
//                         </section>
//                       )}
//                       {hasFolderBookmarks && (
//                         <section {...getSectionProps()}>
//                           <div {...getSectionHeaderProps()}>
//                             <Icon
//                               {...getSectionIconProps(
//                                 'solar:folder-bold',
//                                 'text-primary'
//                               )}
//                             />
//                             <h3 {...getSectionTitleProps('Folders')} />
// //                           </div>
//                           {renderFolderBookmarks()}
//                         </section>
//                       )}
//                     </div>
//                   )}
//                   <DragOverlay
//                     dropAnimation={{
//                       sideEffects: defaultDropAnimationSideEffects({
//                         styles: {
//                           active: {
//                             opacity: '0.4',
//                           },
//                         },
//                       }),
//                     }}
//                   >
//                     {activeFavorite && (
//                       <div {...getFavoriteItemProps()} style={{ opacity: 0.8, cursor: 'grabbing' }}>
//                         {activeFavorite.backgroundImage ? (
//                           <img
//                             {...getFavoriteBackgroundImageProps(
//                               activeFavorite.backgroundImage,
//                               activeFavorite.name
//                             )}
//                           />
//                         ) : (
//                           <div {...getFavoriteBackgroundGradientProps()} />
//                         )}
//                         <div {...getFavoriteOverlayProps()} />
//                         <div {...getFavoriteAvatarContainerProps()}>
//                           <Avatar {...getFavoriteAvatarProps()}>
//                             {activeFavorite.avatar && <Avatar.Image src={activeFavorite.avatar} alt={activeFavorite.name} />}
//                             <Avatar.Fallback {...getFavoriteAvatarFallbackProps(activeFavorite.name)}>
//                               <Icon {...getFavoriteAvatarIconProps()} />
//                             </Avatar.Fallback>
//                           </Avatar>
//                         </div>
//                         <div {...getFavoriteContentProps()}>
//                           <p {...getFavoriteNameProps(activeFavorite.name)} />
//                         </div>
//                       </div>
//                     )}
//                     {activeBookmark && (
//                       <div {...getBookmarkItemProps()} style={{ opacity: 0.8, cursor: 'grabbing', backgroundColor: 'var(--default-100)', borderRadius: '0.5rem', padding: '0.5rem 0.75rem' }}>
//                         <Avatar {...getBookmarkAvatarProps()}>
//                           {activeBookmark.avatar && (
//                             <Avatar.Image src={activeBookmark.avatar} alt={activeBookmark.name} />
//                           )}
//                           <Avatar.Fallback {...getBookmarkAvatarFallbackProps(activeBookmark.name)} />
//                         </Avatar>
//                         <div {...getBookmarkContentProps()}>
//                           <p {...getBookmarkNameProps(activeBookmark.name)} />
//                           {activeBookmark.url && (
//                             <p {...getBookmarkUrlProps(activeBookmark.url)} />
//                           )}
//                         </div>
//                       </div>
//                     )}
//                     {activeFolder && (
//                       <div {...getFolderTriggerProps()} style={{ opacity: 0.8, cursor: 'grabbing', backgroundColor: 'var(--default-100)', borderRadius: '0.5rem', padding: '0.5rem' }}>
//                         <div {...getFolderTriggerContentProps()}>
//                           <Icon {...getFolderIconProps()} />
//                           <span {...getFolderNameProps(activeFolder)} />
//                           <span {...getFolderCountProps(bookmarksByFolder[activeFolder].length)} />
//                         </div>
//                       </div>
//                     )}
//                   </DragOverlay>
//                 </DndContext>
//               </ScrollShadow>
//             </Drawer.Body>
//           </Drawer.Dialog>
//         </Drawer.Content>
//       </Drawer>
//     </Component>
//   )
// })
// BookmarksDrawer.displayName = 'BookmarksDrawer'
// export { BookmarksDrawer }

// import {
//   DndContext,
//   DragEndEvent,
//   DragOverlay,
//   DragStartEvent,
//   KeyboardSensor,
//   PointerSensor,
//   closestCenter,
//   defaultDropAnimationSideEffects,
//   useSensor,
//   useSensors
// } from '@dnd-kit/core'
// import {
//   SortableContext,
//   arrayMove,
//   horizontalListSortingStrategy,
//   rectSortingStrategy,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy
// } from '@dnd-kit/sortable'
// import { Icon } from '@iconify/react'
// import { useMemo, useState } from 'react'
// import React from 'react'

// import { forwardRef } from '@vezham/react-utils'
// import {
//   Accordion,
//   Avatar,
//   Button,
//   Drawer,
//   Input,
//   ScrollShadow
// } from '@vezham/react/v3'

// import { SortableBookmarkItem } from './SortableBookMarksItem'
// import { SortableFavoriteItem } from './SortableFavoriteItem'
// import { SortableFolderItem } from './SortableFolderItem'
// import { sampleBookmarks, sampleFavorites } from './data'
// import { BookmarkItem, FavoriteItem, Props, useProps } from './types'

// const BookmarksDrawer = forwardRef<'div', Props>((props, ref) => {
//   const {
//     Component,
//     getDrawerDialogProps,
//     getDrawerBodyProps,
//     getSearchContainerProps,
//     getSearchInputProps,
//     getScrollShadowProps,
//     getEmptyContainerProps,
//     getEmptyIconProps,
//     getEmptyTitleProps,
//     getEmptyDescriptionProps,
//     getContentContainerProps,
//     getSectionProps,
//     getSectionHeaderProps,
//     getSectionIconProps,
//     getSectionTitleProps,
//     getFavoritesGridProps,
//     getFavorites2GridProps,
//     getFavoriteItemProps,
//     getFavorite2ItemsProps,
//     getFavoriteBackgroundImageProps,
//     getFavoriteBackgroundGradientProps,
//     getFavoriteOverlayProps,
//     getFavoriteAvatarContainerProps,
//     getFavoriteAvatarProps,
//     getFavoriteAvatarIconProps,
//     getFavoriteAvatarFallbackProps,
//     getFavoriteContentProps,
//     getFavoriteNameProps,
//     getBookmarksListProps,
//     getBookmarkItemProps,
//     getBookmarkAvatarProps,
//     getBookmarkAvatarFallbackProps,
//     getBookmarkContentProps,
//     getBookmarkNameProps,
//     getBookmarkUrlProps,
//     getBookmarkDeleteButtonProps,
//     getFolderAccordionProps,
//     getFolderItemProps,
//     getFolderHeadingProps,
//     getFolderTriggerProps,
//     getFolderTriggerContentProps,
//     getFolderIconProps,
//     getFolderNameProps,
//     getFolderCountProps,
//     getFolderIndicatorProps,
//     getFolderPanelProps,
//     getFolderBodyProps,
//     isOpen,
//     onClose,
//     placement,
//     externalFavorites,
//     externalBookmarks,
//     onFavoriteClick,
//     onBookmarkClick,
//     onBookmarkDelete,
//     renderFavoriteItem,
//     renderBookmarkItem,
//     renderFolderItem,
//     onFavoritesReorder,
//     onBookmarksReorder,
//     onFolderReorder
//   } = useProps({
//     ...props,
//     ref
//   })

//   const [searchQuery, setSearchQuery] = useState('')
//   const [internalFavorites, setInternalFavorites] =
//     useState<FavoriteItem[]>(sampleFavorites)
//   const [internalBookmarks, setInternalBookmarks] =
//     useState<BookmarkItem[]>(sampleBookmarks)
//   const [hoveredBookmarkId, setHoveredBookmarkId] = useState<string | null>(
//     null
//   )
//   const [activeId, setActiveId] = useState<string | null>(null)
//   const [activeType, setActiveType] = useState<
//     'favorite' | 'bookmark' | 'folder' | null
//   >(null)

//   const favorites = externalFavorites || internalFavorites
//   const bookmarks = externalBookmarks || internalBookmarks

//   // Sensors for drag and drop
//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 8
//       }
//     }),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates
//     })
//   )

//   const filteredFavorites = favorites.filter(item =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   const filteredBookmarks = bookmarks.filter(item =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   const folderBookmarks = filteredBookmarks.filter(b => b.folder)
//   const singleBookmarks = filteredBookmarks.filter(b => !b.folder)

//   // Create a map of folders to their bookmarks
//   const bookmarksByFolder = useMemo(() => {
//     return folderBookmarks.reduce(
//       (acc, bookmark) => {
//         const folder = bookmark.folder!
//         if (!acc[folder]) {
//           acc[folder] = []
//         }
//         acc[folder].push(bookmark)
//         return acc
//       },
//       {} as Record<string, BookmarkItem[]>
//     )
//   }, [folderBookmarks])

//   // Get sorted folder names based on the actual order in bookmarks array
//   const folderNames = useMemo(() => {
//     const folders = Object.keys(bookmarksByFolder)
//     // Sort folders based on the order they appear in the original bookmarks array
//     return folders.sort((a, b) => {
//       const firstA = folderBookmarks.find(bm => bm.folder === a)
//       const firstB = folderBookmarks.find(bm => bm.folder === b)
//       if (!firstA || !firstB) return 0
//       return folderBookmarks.indexOf(firstA) - folderBookmarks.indexOf(firstB)
//     })
//   }, [bookmarksByFolder, folderBookmarks])

//   const hasFavorites = filteredFavorites.length > 0
//   const hasFolderBookmarks = folderNames.length > 0
//   const hasSingleBookmarks = singleBookmarks.length > 0
//   const hasBookmarks = hasFolderBookmarks || hasSingleBookmarks

//   // Drag and drop handlers
//   const handleDragStart = (event: DragStartEvent) => {
//     const { active } = event
//     setActiveId(active.id as string)

//     // Determine the type of item being dragged
//     if (filteredFavorites.some(f => f.id === active.id)) {
//       setActiveType('favorite')
//     } else if (singleBookmarks.some(b => b.id === active.id)) {
//       setActiveType('bookmark')
//     } else if (folderNames.includes(active.id as string)) {
//       setActiveType('folder')
//     }
//   }

//   const handleFavoriteDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event
//     setActiveId(null)
//     setActiveType(null)

//     if (active.id !== over?.id && over?.id) {
//       const oldIndex = filteredFavorites.findIndex(
//         item => item.id === active.id
//       )
//       const newIndex = filteredFavorites.findIndex(item => item.id === over.id)

//       if (oldIndex !== -1 && newIndex !== -1) {
//         const newFavorites = arrayMove(filteredFavorites, oldIndex, newIndex)

//         if (!externalFavorites) {
//           setInternalFavorites(newFavorites)
//         } else if (onFavoritesReorder) {
//           onFavoritesReorder(newFavorites)
//         }
//       }
//     }
//   }

//   const handleBookmarkDragEnd = (
//     event: DragEndEvent,
//     bookmarkList: BookmarkItem[],
//     isSingleBookmark: boolean
//   ) => {
//     const { active, over } = event
//     setActiveId(null)
//     setActiveType(null)

//     if (active.id !== over?.id && over?.id) {
//       const oldIndex = bookmarkList.findIndex(item => item.id === active.id)
//       const newIndex = bookmarkList.findIndex(item => item.id === over.id)

//       if (oldIndex !== -1 && newIndex !== -1) {
//         const newBookmarkList = arrayMove(bookmarkList, oldIndex, newIndex)

//         if (isSingleBookmark) {
//           // Update single bookmarks while preserving folder bookmarks
//           const otherBookmarks = bookmarks.filter(b => b.folder)
//           const finalBookmarks = [...newBookmarkList, ...otherBookmarks]

//           if (!externalBookmarks) {
//             setInternalBookmarks(finalBookmarks)
//           } else if (onBookmarksReorder) {
//             onBookmarksReorder(finalBookmarks)
//           }
//         } else {
//           // Update folder bookmarks - preserve the folder structure
//           const otherBookmarks = bookmarks.filter(b => !b.folder)
//           const finalBookmarks = [...otherBookmarks, ...newBookmarkList]

//           if (!externalBookmarks) {
//             setInternalBookmarks(finalBookmarks)
//           } else if (onBookmarksReorder) {
//             onBookmarksReorder(finalBookmarks)
//           }
//         }
//       }
//     }
//   }

//   const handleFolderDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event
//     setActiveId(null)
//     setActiveType(null)

//     if (active.id !== over?.id && over?.id) {
//       const oldIndex = folderNames.findIndex(folder => folder === active.id)
//       const newIndex = folderNames.findIndex(folder => folder === over.id)

//       if (oldIndex !== -1 && newIndex !== -1) {
//         // Get all bookmarks that are not in folders
//         const nonFolderBookmarks = bookmarks.filter(b => !b.folder)

//         // Create a new array with reordered folders
//         const reorderedFolders = arrayMove(folderNames, oldIndex, newIndex)

//         // Rebuild the bookmarks array with new folder order
//         const newBookmarks: BookmarkItem[] = [...nonFolderBookmarks]

//         reorderedFolders.forEach(folder => {
//           newBookmarks.push(...bookmarksByFolder[folder])
//         })

//         if (!externalBookmarks) {
//           setInternalBookmarks(newBookmarks)
//         } else if (onFolderReorder) {
//           onFolderReorder(newBookmarks)
//         }
//       }
//     }
//   }

//   const handleItemClick = (url: string, item?: FavoriteItem | BookmarkItem) => {
//     if (url && url !== '#') {
//       window.open(url.startsWith('http') ? url : `https://${url}`, '_blank')
//     }
//   }

//   const handleFavoriteClick = (url: string, item: FavoriteItem) => {
//     if (onFavoriteClick) {
//       onFavoriteClick(url, item)
//     } else {
//       handleItemClick(url, item)
//     }
//   }

//   const handleBookmarkClick = (url: string, item: BookmarkItem) => {
//     if (onBookmarkClick) {
//       onBookmarkClick(url, item)
//     } else {
//       handleItemClick(url, item)
//     }
//   }

//   const handleBookmarkDelete = (item: BookmarkItem, e: React.MouseEvent) => {
//     e.stopPropagation()
//     if (onBookmarkDelete) {
//       onBookmarkDelete(item.id, item)
//     } else {
//       setInternalBookmarks(prev => prev.filter(b => b.id !== item.id))
//     }
//   }

//   const handleFolderBookmarkDragEnd = (
//     event: DragEndEvent,
//     folderName: string
//   ) => {
//     const { active, over } = event
//     if (active.id !== over?.id && over?.id) {
//       const folderItems = bookmarksByFolder[folderName]
//       const oldIndex = folderItems.findIndex(item => item.id === active.id)
//       const newIndex = folderItems.findIndex(item => item.id === over.id)

//       if (oldIndex !== -1 && newIndex !== -1) {
//         const reorderedFolderItems = arrayMove(folderItems, oldIndex, newIndex)

//         // Rebuild the entire bookmarks array
//         const nonFolderBookmarks = bookmarks.filter(b => !b.folder)
//         const newBookmarks: BookmarkItem[] = [...nonFolderBookmarks]

//         folderNames.forEach(folder => {
//           if (folder === folderName) {
//             newBookmarks.push(...reorderedFolderItems)
//           } else {
//             newBookmarks.push(...bookmarksByFolder[folder])
//           }
//         })

//         if (!externalBookmarks) {
//           setInternalBookmarks(newBookmarks)
//         } else if (onBookmarksReorder) {
//           onBookmarksReorder(newBookmarks)
//         }
//       }
//     }
//   }

//   const renderFavoriteItemsForGrid1 = () => {
//     if (renderFavoriteItem) {
//       return filteredFavorites.map(item => (
//         <React.Fragment key={item.id}>
//           {renderFavoriteItem({
//             item,
//             onItemClick: url => handleFavoriteClick(url, item)
//           })}
//         </React.Fragment>
//       ))
//     }

//     return (
//       <SortableContext
//         items={filteredFavorites.map(f => f.id)}
//         strategy={rectSortingStrategy}>
//         {filteredFavorites.map(item => (
//           <SortableFavoriteItem
//             key={item.id}
//             id={item.id}
//             item={item}
//             getFavoriteItemProps={getFavoriteItemProps}
//             getFavoriteBackgroundImageProps={getFavoriteBackgroundImageProps}
//             getFavoriteBackgroundGradientProps={
//               getFavoriteBackgroundGradientProps
//             }
//             getFavoriteOverlayProps={getFavoriteOverlayProps}
//             getFavoriteAvatarContainerProps={getFavoriteAvatarContainerProps}
//             getFavoriteAvatarProps={getFavoriteAvatarProps}
//             getFavoriteAvatarIconProps={getFavoriteAvatarIconProps}
//             getFavoriteAvatarFallbackProps={getFavoriteAvatarFallbackProps}
//             getFavoriteContentProps={getFavoriteContentProps}
//             getFavoriteNameProps={getFavoriteNameProps}
//             onClick={() => handleFavoriteClick(item.url, item)}
//           />
//         ))}
//       </SortableContext>
//     )
//   }

//   const renderFavoriteItemsForGrid2 = () => {
//     if (renderFavoriteItem) {
//       return filteredFavorites.map(item => (
//         <React.Fragment key={item.id}>
//           {renderFavoriteItem({
//             item,
//             onItemClick: url => handleFavoriteClick(url, item)
//           })}
//         </React.Fragment>
//       ))
//     }

//     return (
//       <SortableContext
//         items={filteredFavorites.map(f => f.id)}
//         strategy={horizontalListSortingStrategy}>
//         {filteredFavorites.map(item => (
//           <SortableFavoriteItem
//             key={item.id}
//             id={item.id}
//             item={item}
//             getFavoriteItemProps={getFavorite2ItemsProps}
//             getFavoriteBackgroundImageProps={getFavoriteBackgroundImageProps}
//             getFavoriteBackgroundGradientProps={
//               getFavoriteBackgroundGradientProps
//             }
//             getFavoriteOverlayProps={getFavoriteOverlayProps}
//             getFavoriteAvatarContainerProps={getFavoriteAvatarContainerProps}
//             getFavoriteAvatarProps={getFavoriteAvatarProps}
//             getFavoriteAvatarIconProps={getFavoriteAvatarIconProps}
//             getFavoriteAvatarFallbackProps={getFavoriteAvatarFallbackProps}
//             getFavoriteContentProps={getFavoriteContentProps}
//             getFavoriteNameProps={getFavoriteNameProps}
//             onClick={() => handleFavoriteClick(item.url, item)}
//           />
//         ))}
//       </SortableContext>
//     )
//   }

//   const renderBookmarkItems = (
//     items: BookmarkItem[],
//     isFolderContent: boolean,
//     folderName?: string
//   ) => {
//     if (renderBookmarkItem) {
//       return items.map(item => (
//         <React.Fragment key={item.id}>
//           {renderBookmarkItem({
//             item,
//             onItemClick: url => handleBookmarkClick(url, item)
//           })}
//         </React.Fragment>
//       ))
//     }

//     const handleDragEnd =
//       isFolderContent && folderName
//         ? (event: DragEndEvent) =>
//             handleFolderBookmarkDragEnd(event, folderName)
//         : (event: DragEndEvent) =>
//             handleBookmarkDragEnd(event, items, !isFolderContent)

//     return (
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}>
//         <SortableContext
//           items={items.map(b => b.id)}
//           strategy={verticalListSortingStrategy}>
//           {items.map(bookmark => (
//             <SortableBookmarkItem
//               key={bookmark.id}
//               id={bookmark.id}
//               item={bookmark}
//               getBookmarkItemProps={getBookmarkItemProps}
//               getBookmarkAvatarProps={getBookmarkAvatarProps}
//               getBookmarkAvatarFallbackProps={getBookmarkAvatarFallbackProps}
//               getBookmarkContentProps={getBookmarkContentProps}
//               getBookmarkNameProps={getBookmarkNameProps}
//               getBookmarkUrlProps={getBookmarkUrlProps}
//               getBookmarkDeleteButtonProps={getBookmarkDeleteButtonProps}
//               onClick={() => handleBookmarkClick(bookmark.url, bookmark)}
//               onDelete={e => handleBookmarkDelete(bookmark, e)}
//               isHovered={hoveredBookmarkId === bookmark.id}
//               onMouseEnter={() => setHoveredBookmarkId(bookmark.id)}
//               onMouseLeave={() => setHoveredBookmarkId(null)}
//             />
//           ))}
//         </SortableContext>
//       </DndContext>
//     )
//   }

//   const renderFolderBookmarks = () => {
//     if (renderFolderItem) {
//       return folderNames.map(folder => (
//         <React.Fragment key={folder}>
//           {renderFolderItem(folder, bookmarksByFolder[folder], url =>
//             handleBookmarkClick(url, bookmarksByFolder[folder][0])
//           )}
//         </React.Fragment>
//       ))
//     }

//     return (
//       <SortableContext
//         items={folderNames}
//         strategy={verticalListSortingStrategy}>
//         {folderNames.map(folder => (
//           <SortableFolderItem
//             key={folder}
//             id={folder}
//             folder={folder}
//             items={bookmarksByFolder[folder]}
//             getFolderAccordionProps={getFolderAccordionProps}
//             getFolderItemProps={getFolderItemProps}
//             getFolderHeadingProps={getFolderHeadingProps}
//             getFolderTriggerProps={getFolderTriggerProps}
//             getFolderTriggerContentProps={getFolderTriggerContentProps}
//             getFolderIconProps={getFolderIconProps}
//             getFolderNameProps={getFolderNameProps}
//             getFolderCountProps={getFolderCountProps}
//             getFolderIndicatorProps={getFolderIndicatorProps}
//             getFolderPanelProps={getFolderPanelProps}
//             getFolderBodyProps={getFolderBodyProps}
//             renderBookmarkItems={(items, isFolderContent) =>
//               renderBookmarkItems(items, true, folder)
//             }
//           />
//         ))}
//       </SortableContext>
//     )
//   }

//   const getDragEndHandler = () => {
//     return (event: DragEndEvent) => {
//       const { active } = event

//       if (activeType === 'favorite') {
//         handleFavoriteDragEnd(event)
//       } else if (activeType === 'bookmark') {
//         handleBookmarkDragEnd(event, singleBookmarks, true)
//       } else if (activeType === 'folder') {
//         handleFolderDragEnd(event)
//       }

//       setActiveId(null)
//       setActiveType(null)
//     }
//   }

//   const activeFavorite =
//     activeId && activeType === 'favorite'
//       ? filteredFavorites.find(f => f.id === activeId)
//       : null
//   const activeBookmark =
//     activeId && activeType === 'bookmark'
//       ? singleBookmarks.find(b => b.id === activeId)
//       : null
//   const activeFolder =
//     activeId && activeType === 'folder'
//       ? folderNames.find(f => f === activeId)
//       : null

//   return (
//     <Component>
//       <Drawer isOpen={isOpen} onOpenChange={onClose}>
//         <Drawer.Content placement={placement}>
//           <Drawer.Dialog {...getDrawerDialogProps()}>
//             <Drawer.CloseTrigger />
//             <Drawer.Header>
//               <div {...getSearchContainerProps()}>
//                 <Input
//                   {...getSearchInputProps()}
//                   value={searchQuery}
//                   onChange={e => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </Drawer.Header>

//             <Drawer.Body {...getDrawerBodyProps()}>
//               <ScrollShadow {...getScrollShadowProps()}>
//                 <DndContext
//                   sensors={sensors}
//                   collisionDetection={closestCenter}
//                   onDragStart={handleDragStart}
//                   onDragEnd={getDragEndHandler()}>
//                   {!hasFavorites && !hasBookmarks ? (
//                     <div {...getEmptyContainerProps()}>
//                       <Icon {...getEmptyIconProps()} />
//                       <h2 {...getEmptyTitleProps()} />
//                       <p {...getEmptyDescriptionProps()} />
//                     </div>
//                   ) : (
//                     <div {...getContentContainerProps()}>
//                       {hasFavorites && (
//                         <>
//                           {/* Grid 1: Flex Wrap (Multiple Rows) */}
//                           <section {...getSectionProps()}>
//                             <div {...getSectionHeaderProps()}>
//                               <Icon
//                                 {...getSectionIconProps(
//                                   'solar:star-bold',
//                                   'text-warning'
//                                 )}
//                               />
//                               <h3
//                                 {...getSectionTitleProps('Favorites (Grid)')}
//                               />
//                             </div>
//                             <div {...getFavoritesGridProps()}>
//                               {renderFavoriteItemsForGrid1()}
//                             </div>
//                           </section>

//                           {/* Grid 2: Horizontal Scroll (Single Row) */}
//                           <section {...getSectionProps()}>
//                             <div {...getSectionHeaderProps()}>
//                               <Icon
//                                 {...getSectionIconProps(
//                                   'solar:star-bold',
//                                   'text-warning'
//                                 )}
//                               />
//                               <h3
//                                 {...getSectionTitleProps('Favorites (Scroll)')}
//                               />
//                             </div>
//                             <div {...getFavorites2GridProps()}>
//                               {renderFavoriteItemsForGrid2()}
//                             </div>
//                           </section>
//                         </>
//                       )}

//                       {hasSingleBookmarks && (
//                         <section {...getSectionProps()}>
//                           <div {...getSectionHeaderProps()}>
//                             <Icon
//                               {...getSectionIconProps(
//                                 'solar:bookmark-bold',
//                                 'text-primary'
//                               )}
//                             />
//                             <h3 {...getSectionTitleProps('Bookmarks')} />
//                           </div>
//                           <div {...getBookmarksListProps()}>
//                             {renderBookmarkItems(singleBookmarks, false)}
//                           </div>
//                         </section>
//                       )}

//                       {hasFolderBookmarks && (
//                         <section {...getSectionProps()}>
//                           {renderFolderBookmarks()}
//                         </section>
//                       )}
//                     </div>
//                   )}

//                   <DragOverlay
//                     dropAnimation={{
//                       sideEffects: defaultDropAnimationSideEffects({
//                         styles: {
//                           active: {
//                             opacity: '0.4'
//                           }
//                         }
//                       })
//                     }}>
//                     {activeFavorite && (
//                       <div
//                         {...getFavoriteItemProps()}
//                         style={{ opacity: 0.8, cursor: 'grabbing' }}>
//                         {activeFavorite.backgroundImage ? (
//                           <img
//                             {...getFavoriteBackgroundImageProps(
//                               activeFavorite.backgroundImage,
//                               activeFavorite.name
//                             )}
//                           />
//                         ) : (
//                           <div {...getFavoriteBackgroundGradientProps()} />
//                         )}
//                         <div {...getFavoriteOverlayProps()} />
//                         <div {...getFavoriteAvatarContainerProps()}>
//                           <Avatar {...getFavoriteAvatarProps()}>
//                             {activeFavorite.avatar && (
//                               <Avatar.Image
//                                 src={activeFavorite.avatar}
//                                 alt={activeFavorite.name}
//                               />
//                             )}
//                             <Avatar.Fallback
//                               {...getFavoriteAvatarFallbackProps(
//                                 activeFavorite.name
//                               )}>
//                               <Icon {...getFavoriteAvatarIconProps()} />
//                             </Avatar.Fallback>
//                           </Avatar>
//                         </div>
//                         <div {...getFavoriteContentProps()}>
//                           <p {...getFavoriteNameProps(activeFavorite.name)} />
//                         </div>
//                       </div>
//                     )}

//                     {activeBookmark && (
//                       <div
//                         {...getBookmarkItemProps()}
//                         style={{
//                           opacity: 0.8,
//                           cursor: 'grabbing',
//                           backgroundColor: 'var(--default-100)',
//                           borderRadius: '0.5rem',
//                           padding: '0.5rem 0.75rem'
//                         }}>
//                         <Avatar {...getBookmarkAvatarProps()}>
//                           {activeBookmark.avatar && (
//                             <Avatar.Image
//                               src={activeBookmark.avatar}
//                               alt={activeBookmark.name}
//                             />
//                           )}
//                           <Avatar.Fallback
//                             {...getBookmarkAvatarFallbackProps(
//                               activeBookmark.name
//                             )}
//                           />
//                         </Avatar>
//                         <div {...getBookmarkContentProps()}>
//                           <p {...getBookmarkNameProps(activeBookmark.name)} />
//                           {activeBookmark.url && (
//                             <p {...getBookmarkUrlProps(activeBookmark.url)} />
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {activeFolder && (
//                       <div
//                         {...getFolderTriggerProps()}
//                         style={{
//                           opacity: 0.8,
//                           cursor: 'grabbing',
//                           backgroundColor: 'var(--default-100)',
//                           borderRadius: '0.5rem',
//                           padding: '0.5rem'
//                         }}>
//                         <div {...getFolderTriggerContentProps()}>
//                           <Icon {...getFolderIconProps()} />
//                           <span {...getFolderNameProps(activeFolder)} />
//                           <span
//                             {...getFolderCountProps(
//                               bookmarksByFolder[activeFolder].length
//                             )}
//                           />
//                         </div>
//                       </div>
//                     )}
//                   </DragOverlay>
//                 </DndContext>
//               </ScrollShadow>
//             </Drawer.Body>
//           </Drawer.Dialog>
//         </Drawer.Content>
//       </Drawer>
//     </Component>
//   )
// })

// BookmarksDrawer.displayName = 'BookmarksDrawer'

// export { BookmarksDrawer }

const BookmarksDrawer = forwardRef<'div', Props>((props, ref) => {
  const {
    Component,
    getDrawerDialogProps,
    getDrawerBodyProps,
    getSearchContainerProps,
    getSearchInputProps,
    getScrollShadowProps,
    getEmptyContainerProps,
    getEmptyIconProps,
    getEmptyTitleProps,
    getEmptyDescriptionProps,
    getContentContainerProps,
    getSectionProps,
    getSectionHeaderProps,
    getSectionIconProps,
    getSectionTitleProps,
    getFavoritesGridProps,
    getFavorites2GridProps,
    getFavoriteItemProps,
    getFavorite2ItemsProps,
    getFavoriteBackgroundImageProps,
    getFavoriteBackgroundGradientProps,
    getFavoriteOverlayProps,
    getFavoriteAvatarContainerProps,
    getFavoriteAvatarProps,
    getFavoriteAvatarIconProps,
    getFavoriteAvatarFallbackProps,
    getFavoriteContentProps,
    getFavoriteNameProps,
    getBookmarksListProps,
    getBookmarkItemProps,
    getBookmarkAvatarProps,
    getBookmarkAvatarFallbackProps,
    getBookmarkContentProps,
    getBookmarkNameProps,
    getBookmarkUrlProps,
    getBookmarkDeleteButtonProps,
    isOpen,
    onClose,
    placement,
    externalFavorites,
    externalBookmarks,
    onFavoriteClick,
    onBookmarkClick,
    onBookmarkDelete,
    renderFavoriteItem,
    renderBookmarkItem,
    renderFolderItem,
    onFavoritesReorder,
    onBookmarksReorder,
    onFolderReorder
  } = useProps({
    ...props,
    ref
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [internalFavorites, setInternalFavorites] =
    useState<FavoriteItem[]>(sampleFavorites)
  const [internalBookmarks, setInternalBookmarks] =
    useState<BookmarkItem[]>(sampleBookmarks)
  const [hoveredBookmarkId, setHoveredBookmarkId] = useState<string | null>(
    null
  )
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeType, setActiveType] = useState<
    'favorite' | 'bookmark' | 'folder' | null
  >(null)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

  const favorites = externalFavorites || internalFavorites
  const bookmarks = externalBookmarks || internalBookmarks

  // Sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const filteredFavorites = favorites.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredBookmarks = bookmarks.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const folderBookmarks = filteredBookmarks.filter(b => b.folder)
  const singleBookmarks = filteredBookmarks.filter(b => !b.folder)

  // Create a map of folders to their bookmarks
  const bookmarksByFolder = useMemo(() => {
    return folderBookmarks.reduce(
      (acc, bookmark) => {
        const folder = bookmark.folder!
        if (!acc[folder]) {
          acc[folder] = []
        }
        acc[folder].push(bookmark)
        return acc
      },
      {} as Record<string, BookmarkItem[]>
    )
  }, [folderBookmarks])

  // Get sorted folder names based on the actual order in bookmarks array
  const folderNames = useMemo(() => {
    const folders = Object.keys(bookmarksByFolder)
    // Sort folders based on the order they appear in the original bookmarks array
    return folders.sort((a, b) => {
      const firstA = folderBookmarks.find(bm => bm.folder === a)
      const firstB = folderBookmarks.find(bm => bm.folder === b)
      if (!firstA || !firstB) return 0
      return folderBookmarks.indexOf(firstA) - folderBookmarks.indexOf(firstB)
    })
  }, [bookmarksByFolder, folderBookmarks])

  const hasFavorites = filteredFavorites.length > 0
  const hasFolderBookmarks = folderNames.length > 0
  const hasSingleBookmarks = singleBookmarks.length > 0
  const hasBookmarks = hasFolderBookmarks || hasSingleBookmarks

  // Toggle folder expansion
  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev)
      if (newSet.has(folderName)) {
        newSet.delete(folderName)
      } else {
        newSet.add(folderName)
      }
      return newSet
    })
  }

  // Drag and drop handlers
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)

    // Determine the type of item being dragged
    if (filteredFavorites.some(f => f.id === active.id)) {
      setActiveType('favorite')
    } else if (singleBookmarks.some(b => b.id === active.id)) {
      setActiveType('bookmark')
    } else if (folderNames.includes(active.id as string)) {
      setActiveType('folder')
    }
  }

  const handleFavoriteDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    setActiveType(null)

    if (active.id !== over?.id && over?.id) {
      const oldIndex = filteredFavorites.findIndex(
        item => item.id === active.id
      )
      const newIndex = filteredFavorites.findIndex(item => item.id === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newFavorites = arrayMove(filteredFavorites, oldIndex, newIndex)

        if (!externalFavorites) {
          setInternalFavorites(newFavorites)
        } else if (onFavoritesReorder) {
          onFavoritesReorder(newFavorites)
        }
      }
    }
  }

  const handleBookmarkDragEnd = (
    event: DragEndEvent,
    bookmarkList: BookmarkItem[],
    isSingleBookmark: boolean
  ) => {
    const { active, over } = event
    setActiveId(null)
    setActiveType(null)

    if (active.id !== over?.id && over?.id) {
      const oldIndex = bookmarkList.findIndex(item => item.id === active.id)
      const newIndex = bookmarkList.findIndex(item => item.id === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newBookmarkList = arrayMove(bookmarkList, oldIndex, newIndex)

        if (isSingleBookmark) {
          // Update single bookmarks while preserving folder bookmarks
          const otherBookmarks = bookmarks.filter(b => b.folder)
          const finalBookmarks = [...newBookmarkList, ...otherBookmarks]

          if (!externalBookmarks) {
            setInternalBookmarks(finalBookmarks)
          } else if (onBookmarksReorder) {
            onBookmarksReorder(finalBookmarks)
          }
        } else {
          // Update folder bookmarks - preserve the folder structure
          const otherBookmarks = bookmarks.filter(b => !b.folder)
          const finalBookmarks = [...otherBookmarks, ...newBookmarkList]

          if (!externalBookmarks) {
            setInternalBookmarks(finalBookmarks)
          } else if (onBookmarksReorder) {
            onBookmarksReorder(finalBookmarks)
          }
        }
      }
    }
  }

  const handleFolderDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    setActiveType(null)

    if (active.id !== over?.id && over?.id) {
      const oldIndex = folderNames.findIndex(folder => folder === active.id)
      const newIndex = folderNames.findIndex(folder => folder === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        // Get all bookmarks that are not in folders
        const nonFolderBookmarks = bookmarks.filter(b => !b.folder)

        // Create a new array with reordered folders
        const reorderedFolders = arrayMove(folderNames, oldIndex, newIndex)

        // Rebuild the bookmarks array with new folder order
        const newBookmarks: BookmarkItem[] = [...nonFolderBookmarks]

        reorderedFolders.forEach(folder => {
          newBookmarks.push(...bookmarksByFolder[folder])
        })

        if (!externalBookmarks) {
          setInternalBookmarks(newBookmarks)
        } else if (onFolderReorder) {
          onFolderReorder(newBookmarks)
        }
      }
    }
  }

  const handleItemClick = (url: string, item?: FavoriteItem | BookmarkItem) => {
    if (url && url !== '#') {
      window.open(url.startsWith('http') ? url : `https://${url}`, '_blank')
    }
  }

  const handleFavoriteClick = (url: string, item: FavoriteItem) => {
    if (onFavoriteClick) {
      onFavoriteClick(url, item)
    } else {
      handleItemClick(url, item)
    }
  }

  const handleBookmarkClick = (url: string, item: BookmarkItem) => {
    if (onBookmarkClick) {
      onBookmarkClick(url, item)
    } else {
      handleItemClick(url, item)
    }
  }

  const handleBookmarkDelete = (item: BookmarkItem, e: React.MouseEvent) => {
    e.stopPropagation()
    if (onBookmarkDelete) {
      onBookmarkDelete(item.id, item)
    } else {
      setInternalBookmarks(prev => prev.filter(b => b.id !== item.id))
    }
  }

  const handleFolderBookmarkDragEnd = (
    event: DragEndEvent,
    folderName: string
  ) => {
    const { active, over } = event
    if (active.id !== over?.id && over?.id) {
      const folderItems = bookmarksByFolder[folderName]
      const oldIndex = folderItems.findIndex(item => item.id === active.id)
      const newIndex = folderItems.findIndex(item => item.id === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const reorderedFolderItems = arrayMove(folderItems, oldIndex, newIndex)

        // Rebuild the entire bookmarks array
        const nonFolderBookmarks = bookmarks.filter(b => !b.folder)
        const newBookmarks: BookmarkItem[] = [...nonFolderBookmarks]

        folderNames.forEach(folder => {
          if (folder === folderName) {
            newBookmarks.push(...reorderedFolderItems)
          } else {
            newBookmarks.push(...bookmarksByFolder[folder])
          }
        })

        if (!externalBookmarks) {
          setInternalBookmarks(newBookmarks)
        } else if (onBookmarksReorder) {
          onBookmarksReorder(newBookmarks)
        }
      }
    }
  }

  const renderFavoriteItemsForGrid1 = () => {
    if (renderFavoriteItem) {
      return filteredFavorites.map(item => (
        <React.Fragment key={item.id}>
          {renderFavoriteItem({
            item,
            onItemClick: url => handleFavoriteClick(url, item)
          })}
        </React.Fragment>
      ))
    }

    return (
      <SortableContext
        items={filteredFavorites.map(f => f.id)}
        strategy={rectSortingStrategy}>
        {filteredFavorites.map(item => (
          <SortableFavoriteItem
            key={item.id}
            id={item.id}
            item={item}
            getFavoriteItemProps={getFavoriteItemProps}
            getFavoriteBackgroundImageProps={getFavoriteBackgroundImageProps}
            getFavoriteBackgroundGradientProps={
              getFavoriteBackgroundGradientProps
            }
            getFavoriteOverlayProps={getFavoriteOverlayProps}
            getFavoriteAvatarContainerProps={getFavoriteAvatarContainerProps}
            getFavoriteAvatarProps={getFavoriteAvatarProps}
            getFavoriteAvatarIconProps={getFavoriteAvatarIconProps}
            getFavoriteAvatarFallbackProps={getFavoriteAvatarFallbackProps}
            getFavoriteContentProps={getFavoriteContentProps}
            getFavoriteNameProps={getFavoriteNameProps}
            onClick={() => handleFavoriteClick(item.url, item)}
          />
        ))}
      </SortableContext>
    )
  }

  const renderFavoriteItemsForGrid2 = () => {
    if (renderFavoriteItem) {
      return filteredFavorites.map(item => (
        <React.Fragment key={item.id}>
          {renderFavoriteItem({
            item,
            onItemClick: url => handleFavoriteClick(url, item)
          })}
        </React.Fragment>
      ))
    }

    return (
      <SortableContext
        items={filteredFavorites.map(f => f.id)}
        strategy={horizontalListSortingStrategy}>
        {filteredFavorites.map(item => (
          <SortableFavoriteItem
            key={item.id}
            id={item.id}
            item={item}
            getFavoriteItemProps={getFavorite2ItemsProps}
            getFavoriteBackgroundImageProps={getFavoriteBackgroundImageProps}
            getFavoriteBackgroundGradientProps={
              getFavoriteBackgroundGradientProps
            }
            getFavoriteOverlayProps={getFavoriteOverlayProps}
            getFavoriteAvatarContainerProps={getFavoriteAvatarContainerProps}
            getFavoriteAvatarProps={getFavoriteAvatarProps}
            getFavoriteAvatarIconProps={getFavoriteAvatarIconProps}
            getFavoriteAvatarFallbackProps={getFavoriteAvatarFallbackProps}
            getFavoriteContentProps={getFavoriteContentProps}
            getFavoriteNameProps={getFavoriteNameProps}
            onClick={() => handleFavoriteClick(item.url, item)}
          />
        ))}
      </SortableContext>
    )
  }

  const renderBookmarkItems = (
    items: BookmarkItem[],
    isFolderContent: boolean,
    folderName?: string
  ) => {
    if (renderBookmarkItem) {
      return items.map(item => (
        <React.Fragment key={item.id}>
          {renderBookmarkItem({
            item,
            onItemClick: url => handleBookmarkClick(url, item)
          })}
        </React.Fragment>
      ))
    }

    const handleDragEnd =
      isFolderContent && folderName
        ? (event: DragEndEvent) =>
            handleFolderBookmarkDragEnd(event, folderName)
        : (event: DragEndEvent) =>
            handleBookmarkDragEnd(event, items, !isFolderContent)

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.map(b => b.id)}
          strategy={verticalListSortingStrategy}>
          <div className="mt-2 space-y-1">
            {items.map(bookmark => (
              <SortableBookmarkItem
                key={bookmark.id}
                id={bookmark.id}
                item={bookmark}
                getBookmarkItemProps={getBookmarkItemProps}
                getBookmarkAvatarProps={getBookmarkAvatarProps}
                getBookmarkAvatarFallbackProps={getBookmarkAvatarFallbackProps}
                getBookmarkContentProps={getBookmarkContentProps}
                getBookmarkNameProps={getBookmarkNameProps}
                getBookmarkUrlProps={getBookmarkUrlProps}
                getBookmarkDeleteButtonProps={getBookmarkDeleteButtonProps}
                onClick={() => handleBookmarkClick(bookmark.url, bookmark)}
                onDelete={e => handleBookmarkDelete(bookmark, e)}
                isHovered={hoveredBookmarkId === bookmark.id}
                onMouseEnter={() => setHoveredBookmarkId(bookmark.id)}
                onMouseLeave={() => setHoveredBookmarkId(null)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    )
  }

  const renderFolderCards = () => {
    if (renderFolderItem) {
      return folderNames.map(folder => (
        <React.Fragment key={folder}>
          {renderFolderItem(folder, bookmarksByFolder[folder], url =>
            handleBookmarkClick(url, bookmarksByFolder[folder][0])
          )}
        </React.Fragment>
      ))
    }

    return (
      <SortableContext
        items={folderNames}
        strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {folderNames.map(folder => (
            <SortableFolderCard
              key={folder}
              id={folder}
              folder={folder}
              items={bookmarksByFolder[folder]}
              isExpanded={expandedFolders.has(folder)}
              onToggle={() => toggleFolder(folder)}
              renderBookmarkItems={(items, isFolderContent) =>
                renderBookmarkItems(items, true, folder)
              }
            />
          ))}
        </div>
      </SortableContext>
    )
  }

  const getDragEndHandler = () => {
    return (event: DragEndEvent) => {
      const { active } = event

      if (activeType === 'favorite') {
        handleFavoriteDragEnd(event)
      } else if (activeType === 'bookmark') {
        handleBookmarkDragEnd(event, singleBookmarks, true)
      } else if (activeType === 'folder') {
        handleFolderDragEnd(event)
      }

      setActiveId(null)
      setActiveType(null)
    }
  }

  const activeFavorite =
    activeId && activeType === 'favorite'
      ? filteredFavorites.find(f => f.id === activeId)
      : null
  const activeBookmark =
    activeId && activeType === 'bookmark'
      ? singleBookmarks.find(b => b.id === activeId)
      : null
  const activeFolder =
    activeId && activeType === 'folder'
      ? folderNames.find(f => f === activeId)
      : null

  return (
    <Component>
      <Drawer isOpen={isOpen} onOpenChange={onClose}>
        <Drawer.Content placement={placement}>
          <Drawer.Dialog {...getDrawerDialogProps()}>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <div {...getSearchContainerProps()}>
                <Input
                  {...getSearchInputProps()}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </Drawer.Header>

            <Drawer.Body {...getDrawerBodyProps()}>
              <ScrollShadow {...getScrollShadowProps()}>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={getDragEndHandler()}>
                  {!hasFavorites && !hasBookmarks ? (
                    <div {...getEmptyContainerProps()}>
                      <Icon {...getEmptyIconProps()} />
                      <h2 {...getEmptyTitleProps()} />
                      <p {...getEmptyDescriptionProps()} />
                    </div>
                  ) : (
                    <div {...getContentContainerProps()}>
                      {hasFavorites && (
                        <>
                          {/* Grid 1: Flex Wrap (Multiple Rows) */}
                          <section {...getSectionProps()}>
                            <div {...getSectionHeaderProps()}>
                              <Icon
                                {...getSectionIconProps(
                                  'solar:star-bold',
                                  'text-warning'
                                )}
                              />
                              <h3
                                {...getSectionTitleProps('Favorites (Grid)')}
                              />
                            </div>
                            <div {...getFavoritesGridProps()}>
                              {renderFavoriteItemsForGrid1()}
                            </div>
                          </section>

                          {/* Grid 2: Horizontal Scroll (Single Row) */}
                          <section {...getSectionProps()}>
                            <div {...getSectionHeaderProps()}>
                              <Icon
                                {...getSectionIconProps(
                                  'solar:star-bold',
                                  'text-warning'
                                )}
                              />
                              <h3
                                {...getSectionTitleProps('Favorites (Scroll)')}
                              />
                            </div>
                            <div {...getFavorites2GridProps()}>
                              {renderFavoriteItemsForGrid2()}
                            </div>
                          </section>
                        </>
                      )}

                      {hasSingleBookmarks && (
                        <section {...getSectionProps()}>
                          <div {...getSectionHeaderProps()}>
                            <Icon
                              {...getSectionIconProps(
                                'solar:bookmark-bold',
                                'text-primary'
                              )}
                            />
                            <h3 {...getSectionTitleProps('Bookmarks')} />
                          </div>
                          <div {...getBookmarksListProps()}>
                            {renderBookmarkItems(singleBookmarks, false)}
                          </div>
                        </section>
                      )}

                      {hasFolderBookmarks && (
                        <section {...getSectionProps()}>
                          {renderFolderCards()}
                        </section>
                      )}
                    </div>
                  )}

                  <DragOverlay
                    dropAnimation={{
                      sideEffects: defaultDropAnimationSideEffects({
                        styles: {
                          active: {
                            opacity: '0.4'
                          }
                        }
                      })
                    }}>
                    {activeFavorite && (
                      <div
                        {...getFavoriteItemProps()}
                        style={{ opacity: 0.8, cursor: 'grabbing' }}>
                        {activeFavorite.backgroundImage ? (
                          <img
                            {...getFavoriteBackgroundImageProps(
                              activeFavorite.backgroundImage,
                              activeFavorite.name
                            )}
                          />
                        ) : (
                          <div {...getFavoriteBackgroundGradientProps()} />
                        )}
                        <div {...getFavoriteOverlayProps()} />
                        <div {...getFavoriteAvatarContainerProps()}>
                          <Avatar {...getFavoriteAvatarProps()}>
                            {activeFavorite.avatar && (
                              <Avatar.Image
                                src={activeFavorite.avatar}
                                alt={activeFavorite.name}
                              />
                            )}
                            <Avatar.Fallback
                              {...getFavoriteAvatarFallbackProps(
                                activeFavorite.name
                              )}>
                              <Icon {...getFavoriteAvatarIconProps()} />
                            </Avatar.Fallback>
                          </Avatar>
                        </div>
                        <div {...getFavoriteContentProps()}>
                          <p {...getFavoriteNameProps(activeFavorite.name)} />
                        </div>
                      </div>
                    )}

                    {activeBookmark && (
                      <div
                        {...getBookmarkItemProps()}
                        style={{
                          opacity: 0.8,
                          cursor: 'grabbing',
                          backgroundColor: 'var(--default-100)',
                          borderRadius: '0.5rem',
                          padding: '0.5rem 0.75rem'
                        }}>
                        <Avatar {...getBookmarkAvatarProps()}>
                          {activeBookmark.avatar && (
                            <Avatar.Image
                              src={activeBookmark.avatar}
                              alt={activeBookmark.name}
                            />
                          )}
                          <Avatar.Fallback
                            {...getBookmarkAvatarFallbackProps(
                              activeBookmark.name
                            )}
                          />
                        </Avatar>
                        <div {...getBookmarkContentProps()}>
                          <p {...getBookmarkNameProps(activeBookmark.name)} />
                          {activeBookmark.url && (
                            <p {...getBookmarkUrlProps(activeBookmark.url)} />
                          )}
                        </div>
                      </div>
                    )}

                    {activeFolder && (
                      <div
                        className="bg-default-100 flex items-center gap-2 rounded-lg p-3 shadow-lg"
                        style={{ cursor: 'grabbing', opacity: 0.8 }}>
                        <Icon
                          icon="solar:folder-bold"
                          width={20}
                          className="text-primary"
                        />
                        <span className="font-medium">{activeFolder}</span>
                        <span className="text-default-500 text-xs">
                          ({bookmarksByFolder[activeFolder]?.length || 0})
                        </span>
                      </div>
                    )}
                  </DragOverlay>
                </DndContext>
              </ScrollShadow>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>
    </Component>
  )
})

BookmarksDrawer.displayName = 'BookmarksDrawer'

export { BookmarksDrawer }
