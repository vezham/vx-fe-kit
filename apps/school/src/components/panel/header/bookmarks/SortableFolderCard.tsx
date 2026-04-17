'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Icon } from '@iconify/react'
import React from 'react'

import { Button } from '@vezham/react/v3'

interface SortableFolderCardProps {
  id: string
  folder: string
  items: any[]
  isExpanded: boolean
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

  // Prevent drag when clicking on the toggle button or content
  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggle()
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border-default-200 dark:border-default-700 bg-default-50 dark:bg-default-100/10 overflow-hidden rounded-lg border">
      <div
        {...attributes}
        {...listeners}
        className="bg-default-100 dark:bg-default-800/50 hover:bg-default-200 dark:hover:bg-default-700/50 flex cursor-grab items-center justify-between p-3 transition-colors active:cursor-grabbing">
        <div className="flex flex-1 items-center gap-2">
          <Icon icon="solar:folder-bold" width={20} className="text-primary" />
          <span className="text-default-900 dark:text-default-100 font-medium">
            {folder}
          </span>
          <span className="text-default-500 text-xs">({items.length})</span>
        </div>

        <Button
          variant="ghost"
          onClick={handleToggleClick}
          className="hover:bg-default-200 dark:hover:bg-default-700 cursor-pointer rounded-md p-1 transition-colors"
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
        </Button>
      </div>

      {isExpanded && (
        <div className="bg-default-50 dark:bg-default-900/20 px-3">
          {items.length > 0 ? (
            renderBookmarkItems(items, true)
          ) : (
            <div className="text-default-400 py-4 text-center text-sm">
              No bookmarks in this folder
            </div>
          )}
        </div>
      )}
    </div>
  )
}
