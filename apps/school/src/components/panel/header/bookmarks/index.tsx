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
import {
  ContextMenu,
  EmojiPicker,
  FileTree,
  useFileTreeDrag
} from '@heroui-pro/react'
import { Icon } from '@iconify/react'
import React, { useEffect, useMemo, useState } from 'react'
import { Collection } from 'react-aria-components/Collection'
import { useTreeData } from 'react-aria-components/useTreeData'

import { PropGetter, forwardRef } from '@vezham/react-utils'
import {
  Avatar,
  Button,
  Drawer,
  Input,
  Kbd,
  Label,
  Modal,
  Popover,
  ScrollShadow,
  Separator,
  Tabs,
  useOverlayState
} from '@vezham/react/v3'

import { SortableFavoriteItem } from './SortableFavoriteItem'
import { sampleBookmarks, sampleFavorites } from './data'
import {
  BookmarkItem,
  BookmarkTreeItem,
  FavoriteItem,
  Props,
  TreeSelection,
  useProps
} from './types'

const folderIcon = ({ isExpanded }: { isExpanded: boolean }) =>
  isExpanded ? <FolderOpen /> : <Folder />

const DEFAULT_FOLDER_COLOR = '#007aff'
const DEFAULT_FOLDER_ICON = 'solar:list-bold'
const DEFAULT_FOLDER_EMOJI = '😀'

const folderColors = [
  '#ff3b30',
  '#ff9500',
  '#ffcc00',
  '#34c759',
  '#32ade6',
  '#007aff',
  '#5856d6',
  '#ff2d55',
  '#af52de',
  '#8e7d61',
  '#5d6b78',
  '#d7a59d'
]

const folderIconOptions = [
  'solar:list-bold',
  'solar:bookmark-bold',
  'solar:key-bold',
  'solar:gift-bold',
  'solar:cup-star-bold',
  'solar:square-academic-cap-bold',
  'solar:backpack-bold',
  'solar:notebook-bookmark-bold',
  'solar:document-bold',
  'solar:book-bookmark-bold',
  'solar:card-bold',
  'solar:cart-large-bold',
  'solar:home-bold',
  'solar:buildings-3-bold',
  'solar:banknote-bold',
  'solar:gamepad-bold',
  'solar:headphones-round-bold',
  'solar:leaf-bold',
  'solar:users-group-rounded-bold',
  'solar:heart-bold',
  'solar:star-bold',
  'solar:moon-bold',
  'solar:sun-2-bold',
  'solar:flag-bold'
]

const emojiOptions = [
  '😀',
  '😐',
  '❤️',
  '😂',
  '😍',
  '😌',
  '👌',
  '😊',
  '😚',
  '😭',
  '😩',
  '💕',
  '😔',
  '😉',
  '😁',
  '😳',
  '👍',
  '✌️',
  '😏',
  '😴',
  '🙋',
  '🙈',
  '😎',
  '🎵',
  '👀',
  '😪',
  '😜',
  '😋',
  '👏',
  '💡',
  '📚',
  '🎓',
  '🏫',
  '📝',
  '⭐',
  '🏁'
].map(emoji => ({ emoji, id: emoji, label: emoji }))

type FolderVisualType = 'emoji' | 'icon'

interface FolderFormState {
  id?: string
  name: string
  color: string
  visualType: FolderVisualType
  emoji: string
  icon: string
}

const createDefaultFolderForm = (): FolderFormState => ({
  name: '',
  color: DEFAULT_FOLDER_COLOR,
  visualType: 'icon',
  emoji: DEFAULT_FOLDER_EMOJI,
  icon: DEFAULT_FOLDER_ICON
})

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
        color: DEFAULT_FOLDER_COLOR,
        visualType: 'icon',
        icon: DEFAULT_FOLDER_ICON,
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

const updateTreeItem = (
  items: BookmarkTreeItem[],
  itemId: string,
  updater: (item: BookmarkTreeItem) => BookmarkTreeItem
): BookmarkTreeItem[] =>
  items.map(item => {
    if (item.id === itemId) {
      return updater(item)
    }

    return {
      ...item,
      children: item.children
        ? updateTreeItem(item.children, itemId, updater)
        : item.children
    }
  })

const insertFolderItem = (
  items: BookmarkTreeItem[],
  folder: BookmarkTreeItem,
  parentId?: string
): { inserted: boolean; items: BookmarkTreeItem[] } => {
  if (!parentId) {
    return {
      inserted: true,
      items: [...items, folder]
    }
  }

  let inserted = false
  const nextItems = items.map(item => {
    if (item.id === parentId && item.kind === 'folder') {
      inserted = true

      return {
        ...item,
        children: [...(item.children ?? []), folder]
      }
    }

    if (!item.children?.length) {
      return item
    }

    const childResult = insertFolderItem(item.children, folder, parentId)
    inserted = inserted || childResult.inserted

    return {
      ...item,
      children: childResult.items
    }
  })

  return { inserted, items: nextItems }
}

const createTreeItemId = (prefix: string, existingIds: Set<string>) => {
  const randomValue =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`
  const baseId = `${prefix}:${randomValue}`
  let nextId = baseId
  let index = 1

  while (existingIds.has(nextId)) {
    index += 1
    nextId = `${baseId}:${index}`
  }

  existingIds.add(nextId)

  return nextId
}

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

const collectFolderTargets = (
  items: BookmarkTreeItem[],
  excludedId?: string,
  path: string[] = []
): { id: string; title: string; depth: number }[] =>
  items.reduce<{ id: string; title: string; depth: number }[]>((acc, item) => {
    if (item.kind !== 'folder' || item.id === excludedId) {
      return acc
    }

    const nextPath = [...path, item.title]
    acc.push({
      id: item.id,
      title: nextPath.join(' / '),
      depth: nextPath.length - 1
    })
    acc.push(...collectFolderTargets(item.children ?? [], excludedId, nextPath))

    return acc
  }, [])

const moveTreeItemToFolder = (
  items: BookmarkTreeItem[],
  movedId: string,
  targetFolderId?: string
): { expandedKey?: string; items: BookmarkTreeItem[] } => {
  if (targetFolderId && movedId === targetFolderId) {
    return { items }
  }

  const movedItems: BookmarkTreeItem[] = []
  const itemsWithoutMoved = removeTreeItems(
    items,
    new Set([movedId]),
    movedItems
  )

  if (!movedItems.length) {
    return { items }
  }

  if (!targetFolderId) {
    return {
      items: normalizeBookmarkGroups([...itemsWithoutMoved, ...movedItems])
    }
  }

  if (!findTreeItem(itemsWithoutMoved, targetFolderId)) {
    return { items }
  }

  const result = insertTreeItemsOnTarget(
    itemsWithoutMoved,
    targetFolderId,
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

interface FolderModalProps {
  open: boolean
  mode: 'create' | 'edit'
  form: FolderFormState
  onFormChange: (form: FolderFormState) => void
  onOpenChange: (open: boolean) => void
  onSave: () => void
}

const FolderVisualPreview = ({
  color,
  visualType,
  emoji,
  icon,
  className = ''
}: {
  color: string
  visualType: FolderVisualType
  emoji: string
  icon: string
  className?: string
}) => (
  <span
    className={`flex shrink-0 items-center justify-center rounded-full text-white shadow-sm ${className}`}
    style={{ backgroundColor: color }}>
    {visualType === 'emoji' ? (
      <span className="text-[1em] leading-none">{emoji}</span>
    ) : (
      <Icon icon={icon} width="1em" />
    )}
  </span>
)

const FolderModal = ({
  open,
  mode,
  form,
  onFormChange,
  onOpenChange,
  onSave
}: FolderModalProps) => {
  const state = useOverlayState({
    isOpen: open,
    onOpenChange
  })
  const canSave = form.name.trim().length > 0
  const selectedVisualKey = form.visualType

  const updateForm = (nextForm: Partial<FolderFormState>) => {
    onFormChange({
      ...form,
      ...nextForm
    })
  }

  return (
    <Modal state={state}>
      <Modal.Trigger className="hidden" />
      <Modal.Backdrop
        variant="blur"
        className="fixed inset-0 z-[120] bg-black/35">
        <Modal.Container placement="center">
          <Modal.Dialog className="w-[min(620px,calc(100vw-32px))] overflow-hidden rounded-[28px] border border-black/10 bg-white p-0 shadow-[0_24px_90px_rgba(15,23,42,0.28)]">
            <Modal.Header className="px-8 pt-8 pb-4">
              <Modal.Heading className="text-center text-xl font-semibold text-black">
                {mode === 'create' ? 'New Folder' : 'Edit Folder'}
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="space-y-6 px-8 pb-6">
              <div className="flex items-center gap-4">
                <Label className="w-16 shrink-0 text-base font-medium text-black">
                  Name:
                </Label>
                <Input
                  autoFocus
                  value={form.name}
                  className="border-default-200 focus:border-primary focus:ring-primary/25 h-12 w-full rounded-xl border bg-white px-4 text-base outline-none focus:ring-4"
                  onChange={event => updateForm({ name: event.target.value })}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr]">
                <div className="flex gap-4">
                  <Label className="w-16 shrink-0 pt-1 text-base font-medium text-black">
                    Color:
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    {folderColors.map(color => (
                      <button
                        key={color}
                        type="button"
                        aria-label={`Use ${color} folder color`}
                        className="ring-primary/70 flex h-8 w-8 items-center justify-center rounded-full border border-black/10 shadow-sm transition-transform outline-none hover:scale-105 focus-visible:ring-2"
                        style={{ backgroundColor: color }}
                        onClick={() => updateForm({ color })}>
                        {form.color === color && (
                          <span className="h-2.5 w-2.5 rounded-full bg-white shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <Separator orientation="vertical" className="hidden md:block" />

                <div className="flex gap-4">
                  <Label className="w-14 shrink-0 pt-1 text-base font-medium text-black">
                    Icon:
                  </Label>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <EmojiPicker
                        selectedKey={
                          form.visualType === 'emoji' ? form.emoji : undefined
                        }
                        onSelectionChange={key => {
                          if (!key) return
                          updateForm({
                            visualType: 'emoji',
                            emoji: String(key)
                          })
                        }}>
                        <EmojiPicker.Trigger
                          aria-label="Choose emoji"
                          className="rounded-full">
                          <FolderVisualPreview
                            color={
                              form.visualType === 'emoji'
                                ? form.color
                                : '#d6e8ff'
                            }
                            visualType="emoji"
                            emoji={form.emoji}
                            icon={form.icon}
                            className="h-14 w-14 text-2xl"
                          />
                        </EmojiPicker.Trigger>
                        <EmojiPicker.Popover placement="right">
                          <EmojiPicker.Content>
                            <EmojiPicker.Grid items={emojiOptions}>
                              {item => (
                                <EmojiPicker.Item
                                  id={item.id}
                                  textValue={item.label}>
                                  {item.emoji}
                                </EmojiPicker.Item>
                              )}
                            </EmojiPicker.Grid>
                          </EmojiPicker.Content>
                        </EmojiPicker.Popover>
                      </EmojiPicker>

                      <Popover>
                        <Popover.Trigger>
                          <button
                            type="button"
                            aria-label="Choose icon"
                            className="focus-visible:ring-primary rounded-full outline-none focus-visible:ring-2">
                            <FolderVisualPreview
                              color={
                                form.visualType === 'icon'
                                  ? form.color
                                  : '#e4e4e7'
                              }
                              visualType="icon"
                              emoji={form.emoji}
                              icon={form.icon}
                              className="h-14 w-14 text-2xl"
                            />
                          </button>
                        </Popover.Trigger>
                        <Popover.Content
                          placement="right"
                          className="w-[280px] rounded-3xl p-4">
                          <Popover.Dialog className="grid grid-cols-6 gap-3">
                            {folderIconOptions.map(icon => (
                              <button
                                key={icon}
                                type="button"
                                aria-label={`Use ${icon} icon`}
                                className="bg-default-200 text-default-700 ring-primary hover:bg-default-300 flex h-10 w-10 items-center justify-center rounded-full transition outline-none focus-visible:ring-2"
                                data-selected={
                                  form.visualType === 'icon' &&
                                  form.icon === icon
                                    ? 'true'
                                    : undefined
                                }
                                onClick={() =>
                                  updateForm({ visualType: 'icon', icon })
                                }>
                                <Icon icon={icon} width={22} />
                              </button>
                            ))}
                          </Popover.Dialog>
                        </Popover.Content>
                      </Popover>
                    </div>

                    <Tabs
                      selectedKey={selectedVisualKey}
                      onSelectionChange={key =>
                        updateForm({
                          visualType: String(key) as FolderVisualType
                        })
                      }>
                      <Tabs.ListContainer>
                        <Tabs.List
                          aria-label="Folder visual type"
                          className="*:h-8 *:px-4">
                          <Tabs.Tab id="emoji">
                            Emoji
                            <Tabs.Indicator />
                          </Tabs.Tab>
                          <Tabs.Tab id="icon">
                            <Tabs.Separator />
                            Icon
                            <Tabs.Indicator />
                          </Tabs.Tab>
                        </Tabs.List>
                      </Tabs.ListContainer>
                    </Tabs>
                  </div>
                </div>
              </div>

              <div className="border-default-200 flex items-center gap-3 border-t pt-5">
                <FolderVisualPreview
                  color={form.color}
                  visualType={form.visualType}
                  emoji={form.emoji}
                  icon={form.icon}
                  className="h-10 w-10 text-xl"
                />
                <span className="min-w-0 flex-1 truncate text-base font-medium text-black">
                  {form.name.trim() || 'Untitled Folder'}
                </span>
              </div>
            </Modal.Body>

            <Modal.Footer className="border-default-200 flex justify-end gap-3 border-t px-8 py-5">
              <Button
                variant="secondary"
                className="min-w-24 rounded-xl"
                onPress={state.close}>
                Cancel
              </Button>
              <Button
                variant="primary"
                className="min-w-24 rounded-xl"
                isDisabled={!canSave}
                onPress={onSave}>
                Save
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

interface BookmarkFileTreeProps {
  items: BookmarkTreeItem[]
  defaultExpandedKeys: string[]
  getFileTreeProps: PropGetter
  getBookmarkTreeEmptyStateProps: PropGetter
  onBookmarkClick: (item: BookmarkItem) => void
  onBookmarkRemove: (id: string) => void
  onFolderEdit: (item: BookmarkTreeItem) => void
  onFolderDelete: (id: string) => void
  onNewFolder: (parentId?: string) => void
  onBookmarkMove: (id: string, targetFolderId?: string) => void
  onTreeChange: (items: BookmarkTreeItem[], expandedKey?: string) => void
}

type BookmarkContextTarget =
  | { type: 'folder'; item: BookmarkTreeItem }
  | { type: 'bookmark'; item: BookmarkTreeItem }
  | { type: 'area' }

const BookmarkFileTree = ({
  items,
  defaultExpandedKeys,
  getFileTreeProps,
  getBookmarkTreeEmptyStateProps,
  onBookmarkClick,
  onBookmarkRemove,
  onFolderEdit,
  onFolderDelete,
  onNewFolder,
  onBookmarkMove,
  onTreeChange
}: BookmarkFileTreeProps) => {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
    () => new Set(defaultExpandedKeys)
  )
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())
  const [contextTarget, setContextTarget] = useState<BookmarkContextTarget>({
    type: 'area'
  })

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

  const folderTargets = useMemo(() => collectFolderTargets(items), [items])

  const renderBookmarkIcon = (item: BookmarkTreeItem) => {
    if (item.kind === 'folder') {
      if (item.visualType === 'emoji' && item.emoji) {
        return (
          <FolderVisualPreview
            color={item.color ?? DEFAULT_FOLDER_COLOR}
            visualType="emoji"
            emoji={item.emoji}
            icon={item.icon ?? DEFAULT_FOLDER_ICON}
            className="h-5 w-5 text-sm"
          />
        )
      }

      if (item.visualType === 'icon' && item.icon) {
        return (
          <FolderVisualPreview
            color={item.color ?? DEFAULT_FOLDER_COLOR}
            visualType="icon"
            emoji={item.emoji ?? DEFAULT_FOLDER_EMOJI}
            icon={item.icon}
            className="h-5 w-5 text-sm"
          />
        )
      }

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

  const renderContextMenuLabel = (icon: string, label: string) => (
    <Label className="flex w-full items-center gap-2">
      <Icon icon={icon} width={16} />
      <span>{label}</span>
    </Label>
  )

  const renderFolderMenuItems = (item?: BookmarkTreeItem) => (
    <>
      <ContextMenu.Item
        id="create-folder"
        textValue="Create Folder"
        onPress={() => onNewFolder(item?.id)}>
        {renderContextMenuLabel('solar:folder-plus-linear', 'Create Folder')}
      </ContextMenu.Item>
      <ContextMenu.Separator />
      <ContextMenu.Item
        id="rename-folder"
        textValue="Rename Folder"
        isDisabled={!item}
        onPress={() => item && onFolderEdit(item)}>
        {renderContextMenuLabel('solar:pen-linear', 'Rename Folder')}
      </ContextMenu.Item>
      <ContextMenu.Item
        id="change-color"
        textValue="Change Color"
        isDisabled={!item}
        onPress={() => item && onFolderEdit(item)}>
        {renderContextMenuLabel('solar:palette-round-linear', 'Change Color')}
      </ContextMenu.Item>
      <ContextMenu.Item
        id="change-icon"
        textValue="Change Emoji/Icon"
        isDisabled={!item}
        onPress={() => item && onFolderEdit(item)}>
        {renderContextMenuLabel(
          'solar:smile-circle-linear',
          'Change Emoji/Icon'
        )}
      </ContextMenu.Item>
      <ContextMenu.Separator />
      <ContextMenu.Item
        id="delete-folder"
        textValue="Delete Folder"
        variant="danger"
        isDisabled={!item}
        onPress={() => item && onFolderDelete(item.id)}>
        {renderContextMenuLabel(
          'solar:trash-bin-trash-linear',
          'Delete Folder'
        )}
      </ContextMenu.Item>
    </>
  )

  const renderMoveTargets = (itemId: string) => (
    <ContextMenu.SubmenuTrigger>
      <ContextMenu.Item id="move" textValue="Move">
        {renderContextMenuLabel('solar:folder-with-files-linear', 'Move')}
        <ContextMenu.SubmenuIndicator />
      </ContextMenu.Item>
      <ContextMenu.Popover>
        <ContextMenu.Menu>
          <ContextMenu.Item
            id="move-root"
            textValue="Bookmarks"
            onPress={() => onBookmarkMove(itemId)}>
            <Label>Bookmarks</Label>
          </ContextMenu.Item>
          {folderTargets.map(target => (
            <ContextMenu.Item
              key={target.id}
              id={`move-${target.id}`}
              textValue={target.title}
              onPress={() => onBookmarkMove(itemId, target.id)}>
              <Label
                className="block truncate"
                style={{ paddingInlineStart: target.depth * 10 }}>
                {target.title}
              </Label>
            </ContextMenu.Item>
          ))}
        </ContextMenu.Menu>
      </ContextMenu.Popover>
    </ContextMenu.SubmenuTrigger>
  )

  const renderContextMenuItems = () => {
    if (contextTarget.type === 'folder') {
      return renderFolderMenuItems(contextTarget.item)
    }

    if (contextTarget.type === 'bookmark') {
      return (
        <>
          <ContextMenu.Item
            id="create-folder"
            textValue="Create Folder"
            onPress={() => onNewFolder()}>
            {renderContextMenuLabel(
              'solar:folder-plus-linear',
              'Create Folder'
            )}
          </ContextMenu.Item>
          <ContextMenu.Separator />
          {renderMoveTargets(contextTarget.item.id)}
          <ContextMenu.Separator />
          <ContextMenu.Item
            id="delete-bookmark"
            textValue="Delete"
            variant="danger"
            onPress={() => onBookmarkRemove(contextTarget.item.id)}>
            {renderContextMenuLabel('solar:trash-bin-trash-linear', 'Delete')}
          </ContextMenu.Item>
        </>
      )
    }

    return renderFolderMenuItems()
  }

  const handleItemContextMenu = (
    event: React.MouseEvent,
    item: BookmarkTreeItem
  ) => {
    event.stopPropagation()
    setContextTarget({
      type: item.kind,
      item
    })
    setSelectedKeys(new Set([item.id]))
  }

  const handleAreaContextMenu = () => {
    setContextTarget({ type: 'area' })
    setSelectedKeys(new Set())
  }

  const handleSelectionChange = (keys: TreeSelection) => {
    if (keys === 'all') {
      setSelectedKeys(new Set(items.map(item => item.id)))
      return
    }

    setSelectedKeys(new Set([...keys].map(String)))
  }

  const renderTitle = (item: (typeof tree.items)[number]) => (
    <span
      className="group relative flex w-full min-w-0 flex-1 items-center"
      onContextMenu={event => handleItemContextMenu(event, item.value)}>
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
          if (item.value.kind === 'folder') {
            onFolderDelete(String(item.key))
            return
          }

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
        className="px-0 py-2"
        icon={renderBookmarkIcon(item.value)}
        id={item.key}
        textValue={item.value.title}
        title={renderTitle(item)}
        onContextMenu={event => handleItemContextMenu(event, item.value)}>
        {isFolder && (
          <Collection items={item.children ?? []}>{renderItem}</Collection>
        )}
      </FileTree.Item>
    )
  }

  return (
    <ContextMenu>
      {/* <ContextMenu.Trigger className="block min-h-24">
        <div className="min-h-24" onContextMenu={handleAreaContextMenu}>
          <FileTree
            {...getFileTreeProps()}
            aria-label="Bookmarks file tree"
            dragAndDropHooks={dragAndDropHooks}
            expandedKeys={expandedKeys}
            items={tree.items}
            renderEmptyState={() => (
              <div {...getBookmarkTreeEmptyStateProps()}>No bookmarks</div>
            )}
            selectedKeys={selectedKeys}
            // selectionMode="single"
            showGuideLines="hover"
            onAction={key => {
              const bookmark = bookmarkById.get(String(key))

              if (bookmark) {
                onBookmarkClick(bookmark)
              }
            }}
            onExpandedChange={keys => {
              setExpandedKeys(new Set([...keys].map(String)))
            }}
            onSelectionChange={handleSelectionChange}>
            {renderItem}
          </FileTree>
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Popover>
        <ContextMenu.Menu>{renderContextMenuItems()}</ContextMenu.Menu>
      </ContextMenu.Popover> */}
      <ContextMenu.Trigger>
        <div className="border-border text-muted flex h-48 w-80 items-center justify-center rounded-xl border border-dashed text-sm select-none">
          Right-click here
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Popover>
        <ContextMenu.Menu>
          <ContextMenu.Item id="back" textValue="Back">
            <Label>Back</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>[</Kbd.Content>
            </Kbd>
          </ContextMenu.Item>
          <ContextMenu.Item isDisabled id="forward" textValue="Forward">
            <Label>Forward</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>]</Kbd.Content>
            </Kbd>
          </ContextMenu.Item>
          <ContextMenu.Item id="reload" textValue="Reload">
            <Label>Reload</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>R</Kbd.Content>
            </Kbd>
          </ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item id="view-source" textValue="View Page Source">
            <Label>View Page Source</Label>
          </ContextMenu.Item>
          <ContextMenu.Item id="inspect" textValue="Inspect">
            <Label>Inspect</Label>
          </ContextMenu.Item>
        </ContextMenu.Menu>
      </ContextMenu.Popover>
    </ContextMenu>
  )
}

const BookmarksDrawer = forwardRef<'div', Props>((props, ref) => {
  const {
    Component,
    getDrawerDialogProps,
    getDrawerBodyProps,
    getScrollShadowProps,
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
  const [folderModalOpen, setFolderModalOpen] = useState(false)
  const [folderModalMode, setFolderModalMode] = useState<'create' | 'edit'>(
    'create'
  )
  const [folderParentId, setFolderParentId] = useState<string | undefined>()
  const [folderForm, setFolderForm] = useState<FolderFormState>(() =>
    createDefaultFolderForm()
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
    const convert = (
      node: BookmarkTreeItem,
      folderPath: string[] = []
    ): BookmarkItem => {
      if (node.kind === 'bookmark' && node.bookmark) {
        return {
          ...node.bookmark,
          folder: folderPath[folderPath.length - 1],
          folderPath,
          children: undefined
        }
      }

      const nextPath = [...folderPath, node.title]

      return {
        id: node.id,
        name: node.title,
        kind: 'folder',
        color: node.color,
        visualType: node.visualType,
        emoji: node.emoji,
        icon: node.icon,
        folder: folderPath[folderPath.length - 1],
        folderPath,
        children: (node.children ?? []).map(child => convert(child, nextPath))
      }
    }

    return items.map(item => convert(item))
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

  const openCreateFolderModal = (parentId?: string) => {
    setFolderModalMode('create')
    setFolderParentId(parentId)
    setFolderForm(createDefaultFolderForm())
    setFolderModalOpen(true)
  }

  const openEditFolderModal = (item: BookmarkTreeItem) => {
    setFolderModalMode('edit')
    setFolderParentId(undefined)
    setFolderForm({
      id: item.id,
      name: item.title,
      color: item.color ?? DEFAULT_FOLDER_COLOR,
      visualType: item.visualType ?? 'icon',
      emoji: item.emoji ?? DEFAULT_FOLDER_EMOJI,
      icon: item.icon ?? DEFAULT_FOLDER_ICON
    })
    setFolderModalOpen(true)
  }

  const handleFolderSave = () => {
    const folderName = folderForm.name.trim()

    if (!folderName) {
      return
    }

    if (folderModalMode === 'edit' && folderForm.id) {
      handleBookmarkTreeChange(
        updateTreeItem(bookmarkTreeItems, folderForm.id, item => ({
          ...item,
          title: folderName,
          color: folderForm.color,
          visualType: folderForm.visualType,
          emoji: folderForm.emoji,
          icon: folderForm.icon
        }))
      )
      setFolderModalOpen(false)
      return
    }

    const folder: BookmarkTreeItem = {
      id: createTreeItemId(
        'folder:custom',
        collectTreeItemIds(bookmarkTreeItems)
      ),
      title: folderName,
      kind: 'folder',
      color: folderForm.color,
      visualType: folderForm.visualType,
      emoji: folderForm.emoji,
      icon: folderForm.icon,
      children: []
    }
    const result = insertFolderItem(bookmarkTreeItems, folder, folderParentId)

    if (result.inserted) {
      handleBookmarkTreeChange(result.items)
    }

    setFolderModalOpen(false)
  }

  const handleBookmarkMove = (id: string, targetFolderId?: string) => {
    const result = moveTreeItemToFolder(bookmarkTreeItems, id, targetFolderId)

    handleBookmarkTreeChange(result.items)
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
                          onFolderEdit={openEditFolderModal}
                          onFolderDelete={handleBookmarkRemove}
                          onNewFolder={openCreateFolderModal}
                          onBookmarkMove={handleBookmarkMove}
                          onTreeChange={handleBookmarkTreeChange}
                        />
                      </section>
                    </div>
                  )}
                </ScrollShadow>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
      <FolderModal
        open={folderModalOpen}
        mode={folderModalMode}
        form={folderForm}
        onFormChange={setFolderForm}
        onOpenChange={setFolderModalOpen}
        onSave={handleFolderSave}
      />
    </Component>
  )
})

BookmarksDrawer.displayName = 'BookmarksDrawer'

export { BookmarksDrawer }
