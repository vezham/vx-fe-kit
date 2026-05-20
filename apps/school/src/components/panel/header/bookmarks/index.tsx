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
import React, { useEffect, useMemo, useState } from 'react'
import { Collection } from 'react-aria-components/Collection'
import { useTreeData } from 'react-aria-components/useTreeData'

import { PropGetter, forwardRef } from '@vezham/react-utils'
import { Avatar, Button, Drawer, ScrollShadow } from '@vezham/react/v3'

import { SortableFavoriteItem } from './SortableFavoriteItem'
import { sampleBookmarks, sampleFavorites } from './data'
import {
  BookmarkItem,
  BookmarkTreeItem,
  FavoriteItem,
  Props,
  useProps
} from './types'

const folderIcon = ({ isExpanded }: { isExpanded: boolean }) =>
  isExpanded ? <FolderOpen /> : <Folder />

const getUniqueTreeId = (baseId: string, counts: Map<string, number>) => {
  const count = counts.get(baseId) ?? 0
  counts.set(baseId, count + 1)

  return count === 0 ? baseId : `${baseId}:${count + 1}`
}

const getFolderPathFromBookmark = (bookmark: BookmarkItem) => {
  if (bookmark.folderPath?.length) {
    return bookmark.folderPath
  }

  return bookmark.folder?.split('/').filter(Boolean) ?? []
}

const createBookmarkTreeNode = (
  bookmark: BookmarkItem,
  counts: Map<string, number>
): BookmarkTreeItem => ({
  id: getUniqueTreeId(`bookmark:${bookmark.id}`, counts),
  title: bookmark.name,
  kind: 'bookmark',
  bookmark: {
    ...bookmark,
    kind: 'bookmark',
    children: undefined
  }
})

const bookmarksToTreeItems = (bookmarks: BookmarkItem[]) => {
  const treeItems: BookmarkTreeItem[] = []
  const folderByPath = new Map<string, BookmarkTreeItem>()
  const idCounts = new Map<string, number>()

  const ensureFolder = (path: string[]) => {
    let children = treeItems
    let currentFolder: BookmarkTreeItem | undefined
    let currentPath: string[] = []

    path.forEach(folderName => {
      currentPath = [...currentPath, folderName]
      const pathKey = currentPath.join('/')
      const existingFolder = folderByPath.get(pathKey)

      if (existingFolder) {
        currentFolder = existingFolder
        children = existingFolder.children ?? []
        existingFolder.children = children
        return
      }

      const folder: BookmarkTreeItem = {
        id: getUniqueTreeId(`folder:${pathKey}`, idCounts),
        title: folderName,
        kind: 'folder',
        children: []
      }

      children.push(folder)
      folderByPath.set(pathKey, folder)
      currentFolder = folder
      children = folder.children ?? []
    })

    return currentFolder?.children ?? treeItems
  }

  const appendBookmark = (
    bookmark: BookmarkItem,
    parentPath: string[] = []
  ) => {
    const isFolder =
      bookmark.kind === 'folder' || Boolean(bookmark.children?.length)

    if (isFolder) {
      const folderPath = [...parentPath, bookmark.name]
      ensureFolder(folderPath)
      bookmark.children?.forEach(child => appendBookmark(child, folderPath))

      return
    }

    const folderPath = [...parentPath, ...getFolderPathFromBookmark(bookmark)]
    const children = ensureFolder(folderPath)
    children.push(createBookmarkTreeNode(bookmark, idCounts))
  }

  bookmarks.forEach(bookmark => appendBookmark(bookmark))

  return treeItems
}

const getExpandableBookmarkKeys = (items: BookmarkTreeItem[]) => {
  const keys: string[] = []

  const collect = (item: BookmarkTreeItem) => {
    if (item.kind === 'folder') {
      keys.push(item.id)
    }

    item.children?.forEach(collect)
  }

  items.forEach(collect)

  return keys
}

const removeTreeItem = (
  items: BookmarkTreeItem[],
  itemId: string
): BookmarkTreeItem[] =>
  items
    .filter(item => item.id !== itemId)
    .map(item => ({
      ...item,
      children: item.children
        ? removeTreeItem(item.children, itemId)
        : item.children
    }))

const dedupeTreeItems = (
  items: BookmarkTreeItem[],
  seen = new Set<string>()
): BookmarkTreeItem[] =>
  items.reduce<BookmarkTreeItem[]>((acc, item) => {
    if (seen.has(item.id)) {
      return acc
    }

    seen.add(item.id)
    acc.push({
      ...item,
      children: item.children ? dedupeTreeItems(item.children, seen) : undefined
    })

    return acc
  }, [])

const collectTreeItemIds = (
  items: BookmarkTreeItem[],
  ids = new Set<string>()
) => {
  items.forEach(item => {
    ids.add(item.id)

    if (item.children) {
      collectTreeItemIds(item.children, ids)
    }
  })

  return ids
}

const getUniqueFolderGroupId = (targetId: string, existingIds: Set<string>) => {
  const baseId = `folder:group:${targetId}`
  let nextId = baseId
  let index = 1

  while (existingIds.has(nextId)) {
    index += 1
    nextId = `${baseId}:${index}`
  }

  existingIds.add(nextId)

  return nextId
}

const getFolderTitleFromMovedItems = (movedItems: BookmarkTreeItem[]) => {
  const movedFileName = movedItems[0]?.title.trim()

  return movedFileName || 'New Folder'
}

const cloneTreeItem = (item: BookmarkTreeItem): BookmarkTreeItem => ({
  ...item,
  children: item.children?.map(cloneTreeItem)
})

const normalizeBookmarkGroups = (
  items: BookmarkTreeItem[],
  existingIds = collectTreeItemIds(items)
): BookmarkTreeItem[] =>
  items.map(item => {
    const children = item.children
      ? normalizeBookmarkGroups(item.children, existingIds)
      : undefined

    if (item.kind !== 'bookmark' || !children?.length) {
      return {
        ...item,
        children
      }
    }

    return {
      id: getUniqueFolderGroupId(item.id, existingIds),
      title: getFolderTitleFromMovedItems(children),
      kind: 'folder',
      children: [
        {
          ...item,
          children: undefined
        },
        ...children
      ]
    }
  })

const findTreeItem = (
  items: BookmarkTreeItem[],
  itemId: string
): BookmarkTreeItem | undefined => {
  for (const item of items) {
    if (item.id === itemId) {
      return item
    }

    const childItem = item.children
      ? findTreeItem(item.children, itemId)
      : undefined

    if (childItem) {
      return childItem
    }
  }

  return undefined
}

const removeTreeItems = (
  items: BookmarkTreeItem[],
  itemIds: Set<string>,
  removedItems: BookmarkTreeItem[] = []
): BookmarkTreeItem[] =>
  items.reduce<BookmarkTreeItem[]>((acc, item) => {
    if (itemIds.has(item.id)) {
      removedItems.push(cloneTreeItem(item))
      return acc
    }

    acc.push({
      ...item,
      children: item.children
        ? removeTreeItems(item.children, itemIds, removedItems)
        : item.children
    })

    return acc
  }, [])

const insertTreeItemsRelativeToTarget = (
  items: BookmarkTreeItem[],
  targetId: string,
  movedItems: BookmarkTreeItem[],
  placement: 'before' | 'after'
): { inserted: boolean; items: BookmarkTreeItem[] } => {
  let inserted = false

  const nextItems = items.reduce<BookmarkTreeItem[]>((acc, item) => {
    if (item.id === targetId) {
      inserted = true

      if (placement === 'before') {
        acc.push(...movedItems, item)
      } else {
        acc.push(item, ...movedItems)
      }

      return acc
    }

    if (item.children?.length) {
      const childResult = insertTreeItemsRelativeToTarget(
        item.children,
        targetId,
        movedItems,
        placement
      )

      inserted = inserted || childResult.inserted
      acc.push({
        ...item,
        children: childResult.items
      })

      return acc
    }

    acc.push(item)

    return acc
  }, [])

  return { inserted, items: nextItems }
}

const insertTreeItemsOnTarget = (
  items: BookmarkTreeItem[],
  targetId: string,
  movedItems: BookmarkTreeItem[],
  existingIds: Set<string>
): {
  inserted: boolean
  expandedKey?: string
  items: BookmarkTreeItem[]
} => {
  let expandedKey: string | undefined
  let inserted = false

  const nextItems = items.map(item => {
    if (item.id === targetId) {
      inserted = true

      if (item.kind === 'folder') {
        expandedKey = item.id

        return {
          ...item,
          children: [...(item.children ?? []), ...movedItems]
        }
      }

      const folderId = getUniqueFolderGroupId(item.id, existingIds)
      expandedKey = folderId

      return {
        id: folderId,
        title: getFolderTitleFromMovedItems(movedItems),
        kind: 'folder' as const,
        children: [
          {
            ...item,
            children: undefined
          },
          ...movedItems
        ]
      }
    }

    if (!item.children?.length) {
      return item
    }

    const childResult = insertTreeItemsOnTarget(
      item.children,
      targetId,
      movedItems,
      existingIds
    )

    if (childResult.inserted) {
      inserted = true
      expandedKey = childResult.expandedKey
    }

    return {
      ...item,
      children: childResult.items
    }
  })

  return { expandedKey, inserted, items: nextItems }
}

const moveBookmarkTreeItems = (
  items: BookmarkTreeItem[],
  movedIds: string[],
  targetId: string,
  dropPosition: string
): { expandedKey?: string; items: BookmarkTreeItem[] } => {
  if (!movedIds.length || movedIds.includes(targetId)) {
    return { items }
  }

  const movedIdSet = new Set(movedIds)
  if (!findTreeItem(items, targetId)) {
    return { items }
  }

  const movedItems: BookmarkTreeItem[] = []
  const itemsWithoutMoved = removeTreeItems(items, movedIdSet, movedItems)

  if (!movedItems.length || !findTreeItem(itemsWithoutMoved, targetId)) {
    return { items }
  }

  if (dropPosition === 'on') {
    const result = insertTreeItemsOnTarget(
      itemsWithoutMoved,
      targetId,
      movedItems,
      collectTreeItemIds([...itemsWithoutMoved, ...movedItems])
    )

    return result.inserted
      ? {
          expandedKey: result.expandedKey,
          items: normalizeBookmarkGroups(result.items)
        }
      : { items }
  }

  const result = insertTreeItemsRelativeToTarget(
    itemsWithoutMoved,
    targetId,
    movedItems,
    dropPosition === 'after' ? 'after' : 'before'
  )

  return result.inserted
    ? { items: normalizeBookmarkGroups(result.items) }
    : { items }
}

const getBookmarkTreeSignature = (items: BookmarkTreeItem[]): string =>
  items
    .map(item =>
      [
        item.id,
        item.kind,
        item.title,
        item.children ? getBookmarkTreeSignature(item.children) : ''
      ].join(':')
    )
    .join('|')

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
  onBookmarkRemove: (id: string) => void
  onTreeChange: (items: BookmarkTreeItem[], expandedKey?: string) => void
}

const BookmarkFileTree = ({
  items,
  defaultExpandedKeys,
  getFileTreeProps,
  getBookmarkTreeEmptyStateProps,
  onBookmarkClick,
  onBookmarkRemove,
  onTreeChange
}: BookmarkFileTreeProps) => {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
    () => new Set(defaultExpandedKeys)
  )

  useEffect(() => {
    setExpandedKeys(currentKeys => {
      const nextKeys = new Set(currentKeys)

      defaultExpandedKeys.forEach(key => nextKeys.add(key))

      return nextKeys.size === currentKeys.size ? currentKeys : nextKeys
    })
  }, [defaultExpandedKeys])

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
    onMove: (keys, target) => {
      const result = moveBookmarkTreeItems(
        items,
        [...keys].map(String),
        String(target.key),
        target.dropPosition
      )

      const { expandedKey } = result

      if (expandedKey) {
        setExpandedKeys(currentKeys => {
          const nextKeys = new Set(currentKeys)
          nextKeys.add(expandedKey)

          return nextKeys
        })
      }

      onTreeChange(result.items, result.expandedKey)
    }
  })

  const renderBookmarkIcon = (item: BookmarkTreeItem) => {
    if (item.kind === 'folder') {
      return folderIcon
    }

    if (item.bookmark?.icon) {
      return <Icon icon={item.bookmark.icon} />
    }

    if (item.bookmark?.avatar) {
      return (
        <Avatar className="h-5 w-5 shrink-0">
          <Avatar.Image src={item.bookmark.avatar} alt={item.title} />
          <Avatar.Fallback>
            {item.title.charAt(0).toUpperCase()}
          </Avatar.Fallback>
        </Avatar>
      )
    }

    return <FileCode />
  }

  const renderTitle = (item: (typeof tree.items)[number]) => (
    <span className="group relative flex w-full min-w-0 flex-1 items-center pr-9">
      <span className="min-w-0 flex-1 truncate overflow-hidden">
        {item.value.title}
      </span>
      <Button
        isIconOnly
        aria-label={`Remove ${item.value.title}`}
        size="sm"
        variant="ghost"
        className="text-danger absolute top-1/2 right-0 h-7 w-7 min-w-7 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={event => {
          event.stopPropagation()
          onBookmarkRemove(String(item.key))
        }}>
        <Icon icon="solar:trash-bin-trash-linear" width={16} />
      </Button>
    </span>
  )

  const renderItem = (item: (typeof tree.items)[number]) => {
    const isFolder = item.value.kind === 'folder'

    return (
      <FileTree.Item
        icon={renderBookmarkIcon(item.value)}
        id={item.key}
        textValue={item.value.title}
        title={renderTitle(item)}>
        {isFolder && (
          <Collection items={item.children ?? []}>{renderItem}</Collection>
        )}
      </FileTree.Item>
    )
  }

  return (
    <FileTree
      {...getFileTreeProps()}
      aria-label="Bookmarks file tree"
      dragAndDropHooks={dragAndDropHooks}
      expandedKeys={expandedKeys}
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
      }}
      onExpandedChange={keys => {
        setExpandedKeys(new Set([...keys].map(String)))
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
  const [bookmarkTreeItems, setBookmarkTreeItems] = useState(() =>
    bookmarksToTreeItems(sampleBookmarks)
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

  const filteredFavorites = useMemo(
    () =>
      favorites.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [favorites, searchQuery]
  )

  const filteredBookmarks = useMemo(
    () =>
      bookmarks.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [bookmarks, searchQuery]
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

  useEffect(() => {
    if (externalBookmarks) {
      setBookmarkTreeItems(bookmarksToTreeItems(filteredBookmarks))
    }
  }, [externalBookmarks, filteredBookmarks])

  const bookmarkTreeExpandedKeys = useMemo(
    () => getExpandableBookmarkKeys(bookmarkTreeItems),
    [bookmarkTreeItems]
  )

  const bookmarkTreeKey = useMemo(
    () => getBookmarkTreeSignature(bookmarkTreeItems),
    [bookmarkTreeItems]
  )

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
    handleBookmarkClick(item.url ?? '#', item)
  }

  const treeItemsToBookmarks = (items: BookmarkTreeItem[]) => {
    const nextBookmarks: BookmarkItem[] = []

    const collect = (node: BookmarkTreeItem, folderPath: string[] = []) => {
      if (node.kind === 'bookmark' && node.bookmark) {
        nextBookmarks.push({
          ...node.bookmark,
          folder: folderPath[folderPath.length - 1],
          folderPath
        })
        return
      }

      node.children?.forEach(child =>
        collect(child, [...folderPath, node.title])
      )
    }

    items.forEach(item => collect(item))

    return nextBookmarks
  }

  const handleBookmarkTreeChange = (items: BookmarkTreeItem[]) => {
    const nextItems = dedupeTreeItems(items)
    const nextBookmarks = treeItemsToBookmarks(nextItems)

    setBookmarkTreeItems(nextItems)

    if (!externalBookmarks) {
      setInternalBookmarks(nextBookmarks)
    }

    onBookmarksReorder?.(nextBookmarks)
    onFolderReorder?.(nextBookmarks)
  }

  const handleBookmarkRemove = (id: string) => {
    handleBookmarkTreeChange(removeTreeItem(bookmarkTreeItems, id))
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
              <Icon icon="solar:arrow-left-linear" width={16} />
            </Button>
            <h2 className="text-xl font-semibold">All Favorites</h2>
          </div>
        </div>
        <div className="space-y-2">
          {quickAccessFavorites.map(item => (
            <button
              key={item.id}
              onClick={() => handleFavoriteClick(item.url, item)}
              className="hover:bg-default-100 focus-visible:ring-primary flex w-full cursor-pointer items-center gap-4 rounded-xl px-3 py-3 text-left transition-colors duration-200 outline-none focus-visible:ring-2">
              <Avatar className="h-6 w-6 shrink-0">
                {item.avatar ? (
                  <Avatar.Image src={item.avatar} alt={item.name} />
                ) : item.backgroundImage ? (
                  <Avatar.Image src={item.backgroundImage} alt={item.name} />
                ) : null}
                <Avatar.Fallback className="bg-default-500 text-white">
                  <Icon icon="solar:star-bold" className="text-warning" />
                </Avatar.Fallback>
              </Avatar>
              <span className="font-base min-w-0 flex-1 truncate text-sm text-black">
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
      <div className="flex flex-nowrap gap-3 pb-2">
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
                <Avatar.Fallback {...getFavoriteAvatarFallbackProps(item.name)}>
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
              <Icon icon="solar:eye-bold" width={32} className="text-primary" />
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
    )
  }

  const activeFavorite = activeId && gridFavorites.find(f => f.id === activeId)

  return (
    <Component>
      <Drawer>
        <Drawer.Backdrop
          variant="transparent"
          isOpen={isOpen}
          onOpenChange={open => {
            if (!open) onClose()
          }}>
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
                              {/* <Icon
                              {...getSectionIconProps(
                                'solar:star-bold',
                                'text-warning'
                              )}
                            /> */}
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
                                {/* <Icon
                                {...getSectionIconProps(
                                  'solar:star-bold',
                                  'text-warning'
                                )}
                              /> */}
                                <h3 {...getSectionTitleProps('Quick Access')} />
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="ghost"
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
                                orientation="horizontal"
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
                            onBookmarkRemove={handleBookmarkRemove}
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
        </Drawer.Backdrop>
      </Drawer>
    </Component>
  )
})

BookmarksDrawer.displayName = 'BookmarksDrawer'

export { BookmarksDrawer }
