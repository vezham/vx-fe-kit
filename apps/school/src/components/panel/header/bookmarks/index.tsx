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
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable'
import { FileCode, Folder, FolderOpen } from '@gravity-ui/icons'
import { FileTree, useFileTreeDrag } from '@heroui-pro/react'
import { Icon } from '@iconify/react'
import { useEffect, useMemo, useState } from 'react'
import React from 'react'
import { Collection } from 'react-aria-components/Collection'
import { useTreeData } from 'react-aria-components/useTreeData'

import { PropGetter, forwardRef } from '@vezham/react-utils'
import { Avatar, Button, Drawer, ScrollShadow } from '@vezham/react/v3'

import { SortableFavoriteItem } from './SortableFavoriteItem'
import { sampleBookmarks, sampleFavorites } from './data'
import {
  BookmarkFileTreeNode,
  BookmarkItem,
  BookmarkTreeItem,
  FavoriteItem,
  Props,
  useProps
} from './types'

const folderIcon = ({ isExpanded }: { isExpanded: boolean }) =>
  isExpanded ? <FolderOpen /> : <Folder />

const serializeTree = (
  items: Iterable<BookmarkFileTreeNode>
): BookmarkTreeItem[] =>
  Array.from(items).map(item => ({
    id: String(item.key),
    title: item.value.title,
    kind: item.value.kind,
    bookmark: item.value.bookmark,
    children: item.children ? serializeTree(item.children) : undefined
  }))

const getFavoriteIds = (items: FavoriteItem[]) => items.map(item => item.id)

const reconcileFavoriteOrder = (orderIds: string[], items: FavoriteItem[]) => {
  const itemIds = new Set(getFavoriteIds(items))
  const orderedIds = orderIds.filter(id => itemIds.has(id))
  const missingIds = items
    .map(item => item.id)
    .filter(id => !orderedIds.includes(id))

  return [...orderedIds, ...missingIds]
}

const orderFavorites = (items: FavoriteItem[], orderIds: string[]) => {
  const favoriteById = new Map(items.map(item => [item.id, item]))

  return reconcileFavoriteOrder(orderIds, items)
    .map(id => favoriteById.get(id))
    .filter((item): item is FavoriteItem => Boolean(item))
}

const areIdsEqual = (firstIds: string[], secondIds: string[]) =>
  firstIds.length === secondIds.length &&
  firstIds.every((id, index) => id === secondIds[index])

interface BookmarkFileTreeProps {
  items: BookmarkTreeItem[]
  defaultExpandedKeys: string[]
  getFileTreeProps: PropGetter
  getBookmarkTreeEmptyStateProps: PropGetter
  onBookmarkClick: (item: BookmarkItem) => void
  onTreeChange: (items: BookmarkTreeItem[]) => void
}

const BookmarkFileTree = ({
  items,
  defaultExpandedKeys,
  getFileTreeProps,
  getBookmarkTreeEmptyStateProps,
  onBookmarkClick,
  onTreeChange
}: BookmarkFileTreeProps) => {
  const bookmarkById = useMemo(() => {
    return items.reduce((acc, item) => {
      const collect = (node: BookmarkTreeItem) => {
        if (node.kind === 'bookmark' && node.bookmark) {
          acc.set(node.id, node.bookmark)
        }

        node.children?.forEach(collect)
      }

      collect(item)
      return acc
    }, new Map<string, BookmarkItem>())
  }, [items])

  const tree = useTreeData<BookmarkTreeItem>({
    getChildren: item => item.children ?? [],
    getKey: item => item.id,
    initialItems: items
  })

  const { dragAndDropHooks } = useFileTreeDrag({
    tree,
    onMove: () => {
      onTreeChange(serializeTree(tree.items))
    }
  })

  const renderItem = (item: (typeof tree.items)[number]) => {
    const hasChildren = !!item.children?.length

    return (
      <FileTree.Item
        icon={hasChildren ? folderIcon : <FileCode />}
        id={item.key}
        textValue={item.value.title}
        title={item.value.title}>
        {hasChildren && (
          <Collection items={item.children ?? []}>{renderItem}</Collection>
        )}
      </FileTree.Item>
    )
  }

  return (
    <FileTree
      {...getFileTreeProps()}
      aria-label="Bookmarks file tree"
      defaultExpandedKeys={defaultExpandedKeys}
      dragAndDropHooks={dragAndDropHooks}
      items={tree.items}
      renderEmptyState={() => (
        <div {...getBookmarkTreeEmptyStateProps()}>No bookmarks</div>
      )}
      showGuideLines="hover"
      onAction={key => {
        const bookmark = bookmarkById.get(String(key))

        if (bookmark) {
          onBookmarkClick(bookmark)
        }
      }}>
      {renderItem}
    </FileTree>
  )
}

const BookmarksDrawer = forwardRef<'div', Props>((props, ref) => {
  const {
    Component,
    getDrawerDialogProps,
    getDrawerBodyProps,
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
    getFileTreeProps,
    getBookmarkTreeEmptyStateProps,
    isOpen,
    onClose,
    placement,
    externalFavorites,
    externalBookmarks,
    onFavoriteClick,
    onBookmarkClick,
    renderFavoriteItem,
    onFavoritesReorder,
    onBookmarksReorder,
    onFolderReorder
  } = useProps({
    ...props,
    ref
  })

  const searchQuery = ''
  const [internalFavorites, setInternalFavorites] =
    useState<FavoriteItem[]>(sampleFavorites)
  const [internalBookmarks, setInternalBookmarks] =
    useState<BookmarkItem[]>(sampleBookmarks)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [showAllFavoritesMode, setShowAllFavoritesMode] = useState(false)
  const [isScrollFavoritesOpen, setIsScrollFavoritesOpen] = useState(true)
  const [favoriteGridOrderIds, setFavoriteGridOrderIds] = useState(() =>
    getFavoriteIds(sampleFavorites)
  )
  const [quickAccessOrderIds, setQuickAccessOrderIds] = useState(() =>
    getFavoriteIds(sampleFavorites)
  )

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

  useEffect(() => {
    setFavoriteGridOrderIds(currentIds => {
      const nextIds = reconcileFavoriteOrder(currentIds, favorites)

      return areIdsEqual(currentIds, nextIds) ? currentIds : nextIds
    })

    setQuickAccessOrderIds(currentIds => {
      const nextIds = reconcileFavoriteOrder(currentIds, favorites)

      return areIdsEqual(currentIds, nextIds) ? currentIds : nextIds
    })
  }, [favorites])

  const bookmarkTreeItems = useMemo(() => {
    const treeItems: BookmarkTreeItem[] = []
    const folders = new Map<string, BookmarkTreeItem>()

    filteredBookmarks.forEach(bookmark => {
      const item: BookmarkTreeItem = {
        id: bookmark.id,
        title: bookmark.name,
        kind: 'bookmark',
        bookmark
      }

      if (!bookmark.folder) {
        treeItems.push(item)
        return
      }

      const folderId = `folder:${bookmark.folder}`
      const existingFolder = folders.get(bookmark.folder)
      const folder =
        existingFolder ??
        ({
          id: folderId,
          title: bookmark.folder,
          kind: 'folder',
          children: []
        } satisfies BookmarkTreeItem)

      folder.children?.push(item)

      if (!existingFolder) {
        folders.set(bookmark.folder, folder)
        treeItems.push(folder)
      }
    })

    return treeItems
  }, [filteredBookmarks])

  const bookmarkTreeExpandedKeys = useMemo(() => {
    return bookmarkTreeItems
      .filter(item => item.kind === 'folder')
      .map(item => item.id)
  }, [bookmarkTreeItems])

  const bookmarkTreeKey = useMemo(() => {
    return filteredBookmarks
      .map(bookmark => `${bookmark.id}:${bookmark.folder ?? ''}`)
      .join('|')
  }, [filteredBookmarks])

  // Keep the draggable Favorites grid independent from Quick Access order.
  const gridFavorites = orderFavorites(filteredFavorites, favoriteGridOrderIds)
  const quickAccessFavorites = orderFavorites(
    filteredFavorites,
    quickAccessOrderIds
  )
  const scrollFavorites = quickAccessFavorites.slice(0, 6)
  const hasMoreFavorites = quickAccessFavorites.length > 6

  const hasFavorites = filteredFavorites.length > 0
  // Old hasFolderBookmarks implementation
  // const hasFolderBookmarks = folderNames.length > 0
  // Old hasSingleBookmarks implementation
  // const hasSingleBookmarks = singleBookmarks.length > 0
  const hasBookmarks = bookmarkTreeItems.length > 0

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

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)
  }

  const handleFavoriteDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (active.id !== over?.id && over?.id) {
      const oldIndex = gridFavorites.findIndex(item => item.id === active.id)
      const newIndex = gridFavorites.findIndex(item => item.id === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newFavorites = arrayMove(gridFavorites, oldIndex, newIndex)

        setFavoriteGridOrderIds(getFavoriteIds(newFavorites))

        if (!externalFavorites) {
          setInternalFavorites(newFavorites)
        } else if (onFavoritesReorder) {
          onFavoritesReorder(newFavorites)
        }
      }
    }
  }

  const handleItemClick = (url: string) => {
    if (url && url !== '#') {
      window.open(url.startsWith('http') ? url : `https://${url}`, '_blank')
    }
  }

  const handleFavoriteClick = (url: string, item: FavoriteItem) => {
    if (onFavoriteClick) {
      onFavoriteClick(url, item)
    } else {
      handleItemClick(url)
    }
  }

  const handleBookmarkClick = (url: string, item: BookmarkItem) => {
    if (onBookmarkClick) {
      onBookmarkClick(url, item)
    } else {
      handleItemClick(url)
    }
  }

  const handleBookmarkTreeClick = (item: BookmarkItem) => {
    handleBookmarkClick(item.url, item)
  }

  const treeItemsToBookmarks = (items: BookmarkTreeItem[]) => {
    const nextBookmarks: BookmarkItem[] = []

    const collect = (node: BookmarkTreeItem, folder?: string) => {
      if (node.kind === 'bookmark' && node.bookmark) {
        nextBookmarks.push({
          ...node.bookmark,
          folder
        })
        return
      }

      node.children?.forEach(child => collect(child, node.title))
    }

    items.forEach(item => collect(item))

    return nextBookmarks
  }

  const handleBookmarkTreeChange = (items: BookmarkTreeItem[]) => {
    const nextBookmarks = treeItemsToBookmarks(items)

    if (!externalBookmarks) {
      setInternalBookmarks(nextBookmarks)
    }

    onBookmarksReorder?.(nextBookmarks)
    onFolderReorder?.(nextBookmarks)
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
          <div className="flex min-w-0 items-center gap-2">
            <Button
              isIconOnly
              aria-label="Back to bookmarks"
              size="sm"
              variant="ghost"
              className="text-default-600 shrink-0"
              onClick={handleBackToNormalView}>
              <Icon icon="solar:arrow-left-linear" width={20} />
            </Button>
            <h2 className="text-xl font-semibold">Quick Access</h2>
          </div>
        </div>
        <div className="space-y-2">
          {quickAccessFavorites.map(item => (
            <button
              key={item.id}
              onClick={() => handleFavoriteClick(item.url, item)}
              className="hover:bg-default-100 focus-visible:ring-primary flex w-full cursor-pointer items-center gap-4 rounded-xl px-3 py-3 text-left transition-colors duration-200 outline-none focus-visible:ring-2">
              <Avatar className="h-12 w-12 shrink-0">
                {item.avatar ? (
                  <Avatar.Image src={item.avatar} alt={item.name} />
                ) : item.backgroundImage ? (
                  <Avatar.Image src={item.backgroundImage} alt={item.name} />
                ) : null}
                <Avatar.Fallback className="bg-default-500 text-white">
                  <Icon icon="solar:star-bold" className="text-warning" />
                </Avatar.Fallback>
              </Avatar>
              <span className="min-w-0 flex-1 truncate text-base font-medium text-black">
                {item.name}
              </span>
            </button>
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
                    {quickAccessFavorites.length - 6} more
                  </p>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    )
  }

  const activeFavorite = activeId && gridFavorites.find(f => f.id === activeId)

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
                ) : !hasFavorites && !hasBookmarks ? (
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
                          <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragStart={handleDragStart}
                            onDragCancel={() => setActiveId(null)}
                            onDragEnd={handleFavoriteDragEnd}>
                            {renderFavoriteItemsForGrid()}
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
                                  style={{
                                    opacity: 0.8,
                                    cursor: 'grabbing'
                                  }}>
                                  {activeFavorite.backgroundImage ? (
                                    <img
                                      {...getFavoriteBackgroundImageProps(
                                        activeFavorite.backgroundImage,
                                        activeFavorite.name
                                      )}
                                    />
                                  ) : (
                                    <div
                                      {...getFavoriteBackgroundGradientProps()}
                                    />
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
                                        <Icon
                                          {...getFavoriteAvatarIconProps()}
                                        />
                                      </Avatar.Fallback>
                                    </Avatar>
                                  </div>
                                  <div {...getFavoriteContentProps()}>
                                    <p
                                      {...getFavoriteNameProps(
                                        activeFavorite.name
                                      )}
                                    />
                                  </div>
                                </div>
                              )}
                            </DragOverlay>
                          </DndContext>
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
                              <h3 {...getSectionTitleProps('Quick Access')} />
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
                    {hasBookmarks && (
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
                        <BookmarkFileTree
                          key={bookmarkTreeKey}
                          items={bookmarkTreeItems}
                          defaultExpandedKeys={bookmarkTreeExpandedKeys}
                          getFileTreeProps={getFileTreeProps}
                          getBookmarkTreeEmptyStateProps={
                            getBookmarkTreeEmptyStateProps
                          }
                          onBookmarkClick={handleBookmarkTreeClick}
                          onTreeChange={handleBookmarkTreeChange}
                        />
                      </section>
                    )}
                  </div>
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
