import { type PropGetter } from '@vezham/react-utils'

import { type BookmarkItem, type BookmarkTreeItem } from '../types'

export interface BookmarkFileTreeProps {
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
