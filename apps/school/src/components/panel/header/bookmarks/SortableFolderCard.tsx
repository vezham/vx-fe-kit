import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Icon } from '@iconify/react'
import React from 'react'

interface SortableFolderCardProps {
  id: string
  folder: string
  items: any[]
  isExpanded: boolean
  isDragOver?: boolean
  onToggle: () => void
  renderBookmarkItems: (
    items: any[],
    isFolderContent: boolean
  ) => React.ReactNode
}

export const SortableFolderCard: React.FC<SortableFolderCardProps> = ({
  id,
  folder,
  items,
  isExpanded,
  isDragOver = false,
  onToggle,
  renderBookmarkItems
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab'
  }

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggle()
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`overflow-hidden rounded-lg border transition-all duration-200 ${
        isDragOver
          ? 'border-primary bg-primary/10 ring-primary ring-opacity-50 shadow-lg ring-2'
          : 'border-default-200 dark:border-default-700'
      }`}>
      <div
        {...attributes}
        {...listeners}
        className="hover:bg-default-200 dark:hover:bg-default-700/50 flex cursor-grab items-center justify-between p-3 transition-colors active:cursor-grabbing">
        <div className="flex flex-1 items-center gap-2">
          <Icon icon="solar:folder-bold" width={20} className="text-primary" />
          <span className="text-default-900 dark:text-default-100 font-medium">
            {folder}
          </span>
          <span className="text-default-500 text-xs">({items.length})</span>
        </div>

        <button
          onClick={handleToggleClick}
          className="hover:bg-default-200 cursor-pointer rounded-md p-1 transition-colors"
          aria-label={isExpanded ? 'Collapse folder' : 'Expand folder'}>
          <Icon
            icon={
              isExpanded
                ? 'solar:alt-arrow-up-linear'
                : 'solar:alt-arrow-down-linear'
            }
            width={20}
            className="text-default-600 dark:text-default-400"
          />
        </button>
      </div>

      {isExpanded && (
        <div className="dark:bg-default-900/20 p-3">
          {items.length > 0 ? (
            renderBookmarkItems(items, false)
          ) : (
            <div className="text-default-400 py-4 text-center text-sm">
              Drop bookmarks here
            </div>
          )}
        </div>
      )}
    </div>
  )
}
