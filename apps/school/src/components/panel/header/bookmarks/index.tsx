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
  const [showAllFavoritesMode, setShowAllFavoritesMode] = useState(false)
  const [isScrollFavoritesOpen, setIsScrollFavoritesOpen] = useState(true)
  const [dragOverFolder, setDragOverFolder] = useState<string | null>(null)
  const [dragOverSingleSection, setDragOverSingleSection] = useState(false)

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
    return folders.sort((a, b) => {
      const firstA = folderBookmarks.find(bm => bm.folder === a)
      const firstB = folderBookmarks.find(bm => bm.folder === b)
      if (!firstA || !firstB) return 0
      return folderBookmarks.indexOf(firstA) - folderBookmarks.indexOf(firstB)
    })
  }, [bookmarksByFolder, folderBookmarks])

  // Separate data for grid and scroll
  const gridFavorites = filteredFavorites
  const scrollFavorites = filteredFavorites.slice(0, 6)
  const hasMoreFavorites = filteredFavorites.length > 6

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

  const handleViewAllFavorites = () => {
    setShowAllFavoritesMode(true)
  }

  const handleBackToNormalView = () => {
    setShowAllFavoritesMode(false)
  }

  // Toggle scroll favorites section
  const toggleScrollFavorites = () => {
    setIsScrollFavoritesOpen(!isScrollFavoritesOpen)
  }

  // Move bookmark to folder
  const moveBookmarkToFolder = (bookmarkId: string, targetFolder: string) => {
    const bookmark = bookmarks.find(b => b.id === bookmarkId)
    if (!bookmark) return

    const updatedBookmark = { ...bookmark, folder: targetFolder }
    const otherBookmarks = bookmarks.filter(b => b.id !== bookmarkId)
    const newBookmarks = [...otherBookmarks, updatedBookmark]

    if (!externalBookmarks) {
      setInternalBookmarks(newBookmarks)
    } else if (onBookmarksReorder) {
      onBookmarksReorder(newBookmarks)
    }
  }

  // Move bookmark from folder to single
  const moveBookmarkToSingle = (bookmarkId: string) => {
    const bookmark = bookmarks.find(b => b.id === bookmarkId)
    if (!bookmark) return

    const updatedBookmark = { ...bookmark, folder: undefined }
    const otherBookmarks = bookmarks.filter(b => b.id !== bookmarkId)
    const newBookmarks = [...otherBookmarks, updatedBookmark]

    if (!externalBookmarks) {
      setInternalBookmarks(newBookmarks)
    } else if (onBookmarksReorder) {
      onBookmarksReorder(newBookmarks)
    }
  }

  // Drag and drop handlers
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)

    // Determine the type of item being dragged
    if (gridFavorites.some(f => f.id === active.id)) {
      setActiveType('favorite')
    } else if (
      singleBookmarks.some(b => b.id === active.id) ||
      folderBookmarks.some(b => b.id === active.id)
    ) {
      setActiveType('bookmark')
    } else if (folderNames.includes(active.id as string)) {
      setActiveType('folder')
    }
  }

  const handleDragOver = (event: any) => {
    const { active, over } = event

    // Check if dragging over a folder
    if (
      over &&
      over.id &&
      folderNames.includes(over.id) &&
      activeType === 'bookmark'
    ) {
      setDragOverFolder(over.id)
      setDragOverSingleSection(false)
    }
    // Check if dragging over single bookmarks section
    else if (
      over &&
      over.id === 'single-bookmarks-section' &&
      activeType === 'bookmark'
    ) {
      setDragOverSingleSection(true)
      setDragOverFolder(null)
    } else {
      setDragOverFolder(null)
      setDragOverSingleSection(false)
    }
  }

  const handleFavoriteDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    setActiveType(null)
    setDragOverFolder(null)
    setDragOverSingleSection(false)

    if (active.id !== over?.id && over?.id) {
      const oldIndex = gridFavorites.findIndex(item => item.id === active.id)
      const newIndex = gridFavorites.findIndex(item => item.id === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newFavorites = arrayMove(gridFavorites, oldIndex, newIndex)

        if (!externalFavorites) {
          setInternalFavorites(newFavorites)
        } else if (onFavoritesReorder) {
          onFavoritesReorder(newFavorites)
        }
      }
    }
  }

  const handleBookmarkDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    setActiveType(null)
    setDragOverFolder(null)
    setDragOverSingleSection(false)

    // Check if dropped on a folder
    if (over && over.id && folderNames.includes(over.id as string)) {
      // Move bookmark to folder
      moveBookmarkToFolder(active.id as string, over.id as string)
      return
    }

    // Check if dropped on single bookmarks section
    if (over && over.id === 'single-bookmarks-section') {
      // Move bookmark from folder to single
      moveBookmarkToSingle(active.id as string)
      return
    }

    // Handle reordering within same list
    if (active.id !== over?.id && over?.id) {
      // Check if dragging from single bookmarks
      const isDraggingFromSingle = singleBookmarks.some(b => b.id === active.id)
      const isDraggingToSingle = singleBookmarks.some(b => b.id === over.id)

      if (isDraggingFromSingle && isDraggingToSingle) {
        // Reorder single bookmarks
        const oldIndex = singleBookmarks.findIndex(
          item => item.id === active.id
        )
        const newIndex = singleBookmarks.findIndex(item => item.id === over.id)

        if (oldIndex !== -1 && newIndex !== -1) {
          const newSingleBookmarks = arrayMove(
            singleBookmarks,
            oldIndex,
            newIndex
          )
          const otherBookmarks = bookmarks.filter(b => b.folder)
          const finalBookmarks = [...newSingleBookmarks, ...otherBookmarks]

          if (!externalBookmarks) {
            setInternalBookmarks(finalBookmarks)
          } else if (onBookmarksReorder) {
            onBookmarksReorder(finalBookmarks)
          }
        }
      } else {
        // Check if dragging within same folder
        let sourceFolder = null
        let targetFolder = null

        for (const folder of folderNames) {
          if (bookmarksByFolder[folder].some(b => b.id === active.id)) {
            sourceFolder = folder
          }
          if (bookmarksByFolder[folder].some(b => b.id === over.id)) {
            targetFolder = folder
          }
        }

        if (sourceFolder && targetFolder && sourceFolder === targetFolder) {
          // Reorder within same folder
          const folderItems = bookmarksByFolder[sourceFolder]
          const oldIndex = folderItems.findIndex(item => item.id === active.id)
          const newIndex = folderItems.findIndex(item => item.id === over.id)

          if (oldIndex !== -1 && newIndex !== -1) {
            const reorderedItems = arrayMove(folderItems, oldIndex, newIndex)
            const nonFolderBookmarks = bookmarks.filter(b => !b.folder)
            const newBookmarks: BookmarkItem[] = [...nonFolderBookmarks]

            folderNames.forEach(folder => {
              if (folder === sourceFolder) {
                newBookmarks.push(...reorderedItems)
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
    }
  }

  const handleFolderDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    setActiveType(null)
    setDragOverFolder(null)
    setDragOverSingleSection(false)

    if (active.id !== over?.id && over?.id) {
      const oldIndex = folderNames.findIndex(folder => folder === active.id)
      const newIndex = folderNames.findIndex(folder => folder === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const nonFolderBookmarks = bookmarks.filter(b => !b.folder)
        const reorderedFolders = arrayMove(folderNames, oldIndex, newIndex)
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

  const renderFavoriteItemsForGrid = () => {
    if (renderFavoriteItem) {
      return gridFavorites.map(item => (
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
        items={gridFavorites.map(f => f.id)}
        strategy={rectSortingStrategy}>
        <div {...getFavoritesGridProps()} className="flex flex-wrap gap-3">
          {gridFavorites.map(item => (
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
        </div>
      </SortableContext>
    )
  }

  const renderAllFavoritesFullView = () => {
    return (
      <div className="space-y-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:star-bold" width={24} className="text-warning" />
            <h2 className="text-xl font-semibold">All Favorites</h2>
          </div>
          <Button
            size="sm"
            variant="light"
            startContent={<Icon icon="solar:arrow-left-linear" width={16} />}
            onClick={handleBackToNormalView}>
            Back
          </Button>
        </div>
        <div className="flex flex-wrap gap-3">
          {filteredFavorites.map(item => (
            <div
              key={item.id}
              {...getFavoriteItemProps()}
              onClick={() => handleFavoriteClick(item.url, item)}
              className="group relative flex aspect-square w-[calc(25%-12px)] cursor-pointer flex-col overflow-hidden rounded-2xl transition-transform hover:scale-[1.02] active:scale-[0.98]">
              {item.backgroundImage ? (
                <img
                  {...getFavoriteBackgroundImageProps(
                    item.backgroundImage,
                    item.name
                  )}
                />
              ) : (
                <div {...getFavoriteBackgroundGradientProps()} />
              )}
              <div {...getFavoriteOverlayProps()} />

              <div {...getFavoriteAvatarContainerProps()}>
                <Avatar {...getFavoriteAvatarProps()}>
                  {item.avatar && (
                    <Avatar.Image src={item.avatar} alt={item.name} />
                  )}
                  <Avatar.Fallback
                    {...getFavoriteAvatarFallbackProps(item.name)}>
                    <Icon {...getFavoriteAvatarIconProps()} />
                  </Avatar.Fallback>
                </Avatar>
              </div>

              <div {...getFavoriteContentProps()}>
                <p {...getFavoriteNameProps(item.name)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderFavoriteItemsForScroll = () => {
    if (renderFavoriteItem) {
      return scrollFavorites.map(item => (
        <React.Fragment key={item.id}>
          {renderFavoriteItem({
            item,
            onItemClick: url => handleFavoriteClick(url, item)
          })}
        </React.Fragment>
      ))
    }

    return (
      <div className="flex flex-col">
        <div className="flex flex-nowrap gap-3 overflow-x-auto pb-2">
          {scrollFavorites.map(item => (
            <div
              key={item.id}
              {...getFavorite2ItemsProps()}
              onClick={() => handleFavoriteClick(item.url, item)}>
              {item.backgroundImage ? (
                <img
                  {...getFavoriteBackgroundImageProps(
                    item.backgroundImage,
                    item.name
                  )}
                />
              ) : (
                <div {...getFavoriteBackgroundGradientProps()} />
              )}
              <div {...getFavoriteOverlayProps()} />

              <div {...getFavoriteAvatarContainerProps()}>
                <Avatar {...getFavoriteAvatarProps()}>
                  {item.avatar && (
                    <Avatar.Image src={item.avatar} alt={item.name} />
                  )}
                  <Avatar.Fallback
                    {...getFavoriteAvatarFallbackProps(item.name)}>
                    <Icon {...getFavoriteAvatarIconProps()} />
                  </Avatar.Fallback>
                </Avatar>
              </div>

              <div {...getFavoriteContentProps()}>
                <p {...getFavoriteNameProps(item.name)} />
              </div>
            </div>
          ))}

          {/* View All Tile */}
          {hasMoreFavorites && (
            <button
              onClick={handleViewAllFavorites}
              className="group bg-default-100 hover:bg-default-200 relative flex aspect-square w-[120px] shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]">
              <div className="flex flex-col items-center gap-2 p-4">
                <Icon
                  icon="solar:eye-bold"
                  width={32}
                  className="text-primary"
                />
                <div className="text-center">
                  <p className="text-default-700 text-sm font-semibold">
                    View All
                  </p>
                  <p className="text-default-500 text-xs">
                    {filteredFavorites.length - 6} more
                  </p>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
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

    return (
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
        <div className="space-y-1">
          {folderNames.map(folder => (
            <SortableFolderCard
              key={folder}
              id={folder}
              folder={folder}
              items={bookmarksByFolder[folder]}
              isExpanded={expandedFolders.has(folder)}
              onToggle={() => toggleFolder(folder)}
              isDragOver={dragOverFolder === folder}
              renderBookmarkItems={(items, isFolderContent) =>
                renderBookmarkItems(items, false, folder)
              }
            />
          ))}
        </div>
      </SortableContext>
    )
  }

  const getDragEndHandler = () => {
    return (event: DragEndEvent) => {
      if (activeType === 'favorite') {
        handleFavoriteDragEnd(event)
      } else if (activeType === 'bookmark') {
        handleBookmarkDragEnd(event)
      } else if (activeType === 'folder') {
        handleFolderDragEnd(event)
      }

      setActiveId(null)
      setActiveType(null)
      setDragOverFolder(null)
      setDragOverSingleSection(false)
    }
  }

  const activeFavorite =
    activeId && activeType === 'favorite'
      ? gridFavorites.find(f => f.id === activeId)
      : null
  const activeBookmark =
    activeId && activeType === 'bookmark'
      ? [...singleBookmarks, ...folderBookmarks].find(b => b.id === activeId)
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

            <Drawer.Body {...getDrawerBodyProps()}>
              <ScrollShadow {...getScrollShadowProps()}>
                {showAllFavoritesMode ? (
                  <div {...getContentContainerProps()}>
                    {renderAllFavoritesFullView()}
                  </div>
                ) : (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
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
                            {/* Grid: Flex Wrap with Full 2D Drag Drop */}
                            <section {...getSectionProps()}>
                              <div {...getSectionHeaderProps()}>
                                <Icon
                                  {...getSectionIconProps(
                                    'solar:star-bold',
                                    'text-warning'
                                  )}
                                />
                                <h3 {...getSectionTitleProps('Favorites')} />
                              </div>
                              {renderFavoriteItemsForGrid()}
                            </section>

                            {/* Scroll: Horizontal Scroll with View All */}
                            <section {...getSectionProps()}>
                              <div {...getSectionHeaderProps()}>
                                <div className="flex flex-1 items-center gap-2">
                                  <Icon
                                    {...getSectionIconProps(
                                      'solar:star-bold',
                                      'text-warning'
                                    )}
                                  />
                                  <h3
                                    {...getSectionTitleProps('Quick Access')}
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    onClick={toggleScrollFavorites}
                                    className="text-default-400">
                                    <Icon
                                      icon={
                                        isScrollFavoritesOpen
                                          ? 'solar:alt-arrow-up-linear'
                                          : 'solar:alt-arrow-down-linear'
                                      }
                                      width={18}
                                    />
                                  </Button>
                                </div>
                              </div>

                              {isScrollFavoritesOpen && (
                                <ScrollShadow
                                  className="max-w-full overflow-x-auto pb-2"
                                  hideScrollBar={false}>
                                  {renderFavoriteItemsForScroll()}
                                </ScrollShadow>
                              )}
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
                            <div
                              {...getBookmarksListProps()}
                              id="single-bookmarks-section"
                              className={`rounded-lg border-2 p-2 transition-all ${
                                dragOverSingleSection
                                  ? 'border-primary bg-primary/10 ring-primary ring-opacity-50 shadow-lg ring-2'
                                  : 'border-transparent'
                              }`}>
                              {singleBookmarks.length > 0 ? (
                                renderBookmarkItems(singleBookmarks, false)
                              ) : (
                                <div className="text-default-400 py-8 text-center text-sm">
                                  Drop bookmarks here to add to this list
                                </div>
                              )}
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
                            padding: '0.5rem 0.75rem',
                            width: '300px'
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
                )}
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
